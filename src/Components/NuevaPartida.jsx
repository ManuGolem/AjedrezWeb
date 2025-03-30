export function NuevaPartida({ reiniciarTablero }) {
    return (
        <button className="nuevaPartida" onClick={reiniciarTablero}>
            Nueva Partida
        </button>
    );
}
