export function NuevaPartida({ reiniciarTablero, turno }) {
    return (
        <>
            <button className="turno">Turno:{turno ? "blanco" : "negro"}</button>
            <button className="nuevaPartida" onClick={reiniciarTablero}>
                Nueva Partida
            </button>
        </>
    );
}
