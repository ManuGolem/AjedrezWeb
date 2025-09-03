import { useEffect, useState } from "react";
import data from "../dictionary.json";
import { esPeon } from "../utils/esAlgo";
import { useGame } from "../context";
export function ModalDerecho({ reiniciarTablero }) {
    const [resultado, setResultado] = useState(false);
    const [movActual, setMovActual] = useState(-1);
    const [prueba, setPrueba] = useState(-1);
    const { jugadas, mate, ahogado, jaque, historial, setMapPiezas, setMirandoHistorial, setPosibles, setCapturas } = useGame();
    useEffect(() => {
        if (mate) {
            setResultado(jaque.piezas === "blancas" ? "Ganan negras(0-1)" : "Ganan blancas(1-0)");
        } else if (ahogado) {
            setResultado("Rey ahogado (1/2-1/2)");
        } else {
            setResultado(false);
        }
    }, [mate, ahogado]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                jugadaAnterior();
            } else if (event.key === "ArrowRight") {
                jugadaSiguiente();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [movActual, historial.length]);
    useEffect(() => {
        setMovActual(movActual + 1);
    }, [historial]);
    function irAJugada(mov) {
        const ultimoMov = historial.length - 1;
        if (mov > ultimoMov || mov < -1) {
            return;
        } else if (mov === -1) {
            setMovActual(mov);
            setMapPiezas(data.posicionInicial);
            return;
        }
        setMapPiezas(historial[mov]);
        setMirandoHistorial(mov !== ultimoMov);
        setMovActual(mov);
        if (mov !== ultimoMov) {
            setMirandoHistorial(true);
            setPosibles();
            setCapturas();
        } else {
            setMirandoHistorial(false);
        }
    }
    function jugadaAnterior() {
        irAJugada(movActual - 1);
    }
    function jugadaSiguiente() {
        irAJugada(movActual + 1);
    }
    function ultimaJugada() {
        irAJugada(historial.length - 1);
    }
    function escribirMovimiento(mov, index, indexInterno) {
        const partes = mov.split("");
        const movIndex = index * 2 + indexInterno;
        const letra = esPeon(partes[0]);
        const movimiento = letra !== true ? partes.slice(1).join("") : mov;
        const coronacion = movimiento.split("=");
        let piezaNueva;
        if (coronacion.length > 1) {
            piezaNueva = coronacion[1];
        }
        return (
            <>
                {letra !== true ? (
                    <span className="movimiento" onClick={() => irAJugada(movIndex)}>
                        <img src={data.piezas[letra]} alt={letra} />
                        {movimiento}
                    </span>
                ) : (
                    <span className="movimiento" onClick={() => irAJugada(movIndex)}>
                        {coronacion[0]}
                        {piezaNueva && (
                            <>
                                {" ="}
                                <img src={data.piezas[piezaNueva[0]]} alt={letra} />
                                {piezaNueva.slice(1)}
                            </>
                        )}
                    </span>
                )}
            </>
        );
    }
    return (
        <article className="botonesNuevaPartida">
            <button className="nuevaPartida" onClick={reiniciarTablero}>
                Nueva Partida
            </button>
            <div className="notacion">
                {jugadas &&
                    jugadas.map((jugada, index) => (
                        <p key={index} className={`jugada ${index % 2 === 0 ? "jugada2" : "jugada1"}`}>
                            {index + 1}.{jugada.map((mov, indexInterno) => escribirMovimiento(mov, index, indexInterno))}
                        </p>
                    ))}
            </div>
            <div className="botonesHistorial">
                <button onClick={jugadaAnterior}>&lt;</button>
                <button onClick={ultimaJugada}>|&gt;</button>
                <button onClick={jugadaSiguiente}>&gt;</button>
            </div>
            {resultado !== false && (
                <div>
                    <h1>Fin de la partida</h1>
                    <h2>Resultado: {resultado}</h2>
                </div>
            )}
        </article>
    );
}
