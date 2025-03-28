import { useEffect } from "react";
import data from "../dictionary.json";
import { useState } from "react";
export function Tablero() {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    useEffect(() => {
        let tableroAux = Array(8)
            .fill(null)
            .map(() => Array(8).fill(""));
        const arregloUtil = [
            [8, 7, 6, 5, 4, 3, 2, 1],
            ["a", "b", "c", "d", "e", "f", "g", "h"],
        ];
        arregloUtil[0].forEach((columna, indexcol) => {
            arregloUtil[1].forEach((fila, indexfila) => {
                tableroAux[indexcol][indexfila] = `${fila}${columna}`;
            });
        });
        //Seteo el tablero con sus cords
        setTablero(tableroAux);
        setMapPiezas({
            a1: "r",
            b1: "c",
            c1: "b",
            d1: "q",
            e1: "k",
            f1: "b",
            g1: "c",
            h1: "r",
            a2: "p",
            b2: "p",
            c2: "p",
            d2: "p",
            e2: "p",
            f2: "p",
            g2: "p",
            h2: "p",
            a7: "P",
            b7: "P",
            c7: "P",
            d7: "P",
            e7: "P",
            f7: "P",
            g7: "P",
            h7: "P",
            a8: "R",
            b8: "C",
            c8: "B",
            d8: "Q",
            e8: "K",
            f8: "B",
            g8: "C",
            h8: "R",
        });
    }, []);

    function mostrarPath(cord) {
        const pieza = mapPosPiezas[cord];
        if (pieza === "p") {
            console.log("es un peon");
        }
    }

    return (
        <article className="tablero">
            {tablero &&
                tablero.map((fila, i) =>
                    fila.map((columna, j) => (
                        <div
                            key={`${i}-${j}`}
                            id={columna}
                            className={data.tablero[columna]}
                        >
                            {data.piezasStart[columna] && (
                                <img
                                    onClick={() => mostrarPath(columna)}
                                    className="pieza"
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
