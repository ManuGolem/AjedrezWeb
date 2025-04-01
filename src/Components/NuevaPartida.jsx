export function NuevaPartida({ reiniciarTablero, turno }) {
    return (
        <article className="botonesNuevaPartida">
            <button className="turno">Turno:{turno ? "blanco" : "negro"}</button>
            <button className="nuevaPartida" onClick={reiniciarTablero}>
                Nueva Partida
            </button>
        </article>
    );
}
