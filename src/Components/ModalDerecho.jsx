import { useEffect, useState } from "react";
import data from "../dictionary.json";
import { esPeon } from "../utils/esAlgo";
import { useGame } from "../context";
import { irAJugada } from "../utils/utils";
export function ModalDerecho({ reiniciarTablero }) {
    const [resultado, setResultado] = useState(false);
    const { jugadas, mate, ahogado, jaque, historial } = useGame();
    useEffect(() => {
        if (mate) {
            setResultado(jaque.piezas === "blancas" ? "Ganan negras(0-1)" : "Ganan blancas(1-0)");
        } else if (ahogado) {
            setResultado("Rey ahogado (1/2-1/2)");
        } else {
            setResultado(false);
        }
    }, [mate, ahogado]);
    function escribirMovimiento(mov) {
        const partes = mov.split("");
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
                    <span className="movimiento" onClick={() => irAJugada(mov, historial)}>
                        <img src={data.piezas[letra]} alt={letra} />
                        {movimiento}
                    </span>
                ) : (
                    <span className="movimiento" onClick={() => irAJugada(mov, historial)}>
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
                            {index + 1}.{jugada.map((mov) => escribirMovimiento(mov))}
                        </p>
                    ))}
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
