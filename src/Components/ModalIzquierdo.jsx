export function ModalIzquierdo({ reiniciarTablero, jugadas }) {
    return (
        <article className="botonesNuevaPartida">
            <button className="nuevaPartida" onClick={reiniciarTablero}>
                Nueva Partida
            </button>
            <div className="notacion">
                {jugadas &&
                    jugadas.map((jugada, index) => (
                        <p key={index} className="jugada">
                            {index + 1}.
                            {jugada.map((mov) => (
                                <span className="movimiento">{mov}</span>
                            ))}
                        </p>
                    ))}
            </div>
        </article>
    );
}
