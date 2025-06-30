import data from "../dictionary.json";
export function ModalDerecho({ reiniciarTablero, jugadas }) {
    function esPeon(pieza) {
        const piezaCode = pieza.charCodeAt(0);
        if ((piezaCode <= "h".charCodeAt(0) && piezaCode >= "a".charCodeAt(0)) || pieza == "O") {
            return false;
        } else {
            return pieza;
        }
    }
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
        </article>
    );
}
