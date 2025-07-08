import { useEffect, useState } from "react";
import data from "../dictionary.json";
import { esPeon } from "../utils/esAlgo";
export function ModalDerecho({ reiniciarTablero, jugadas, mate, ahogado }) {
    const [resultado, setResultado] = useState(false);
    useEffect(() => {
        if (mate) {
            setResultado("Mate");
        } else if (ahogado) {
            setResultado("1/2-1/2");
        } else {
            setResultado(false);
        }
    }, [mate, ahogado]);
    function escribirMovimiento(mov) {
        const partes = mov.split("");
        const letra = esPeon(partes[0]);
        const movimiento = letra ? partes.slice(1) : mov;
        return (
            <>
                {letra ? (
                    <span className="movimiento">
                        <img src={data.piezas[letra]} alt={letra} />
                        {movimiento}
                    </span>
                ) : (
                    <span className="movimiento">{movimiento}</span>
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
                        <p key={index} className="jugada">
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
