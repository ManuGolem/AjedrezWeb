import data from "../dictionary.json";
export function PiezasCapturadas({ color, piezasCapturadas }) {
    return (
        <div className="piezasCapturadas">
            <h1>Piezas capturadas de las {color}:</h1>
            {piezasCapturadas[color].map((pieza) => (
                <img className="piezaMuestra" src={data.piezas[pieza]} alt={pieza} />
            ))}
        </div>
    );
}
