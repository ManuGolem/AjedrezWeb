import data from "../dictionary.json";
export function Tablero() {
    const arregloUtil = [
        [8, 7, 6, 5, 4, 3, 2, 1],
        ["a", "b", "c", "d", "e", "f", "g", "h"],
    ];
    let tablero = Array(8)
        .fill(null)
        .map(() => Array(8).fill(""));
    arregloUtil[0].forEach((columna, indexcol) => {
        arregloUtil[1].forEach((fila, indexfila) => {
            tablero[indexcol][indexfila] = `${fila}${columna}`;
        });
    });
    return (
        <article className="tablero">
            {tablero.map((fila, i) =>
                fila.map((columna, j) => (
                    <div
                        key={`${i}-${j}`}
                        id={columna}
                        className={data.tablero[columna]}
                    >
                        {data.piezasStart[columna] && (
                            <img
                                src={data.piezasStart[columna]}
                                alt={columna}
                            />
                        )}
                    </div>
                )),
            )}
        </article>
    );
}
