import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { mostrarPath } from "../utils/path";
export function Tablero() {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    const [posibles, setPosibles] = useState();
    const { tableroCords, piezas } = useStartTablero();
    useEffect(() => {
        setTablero(tableroCords);
        setMapPiezas(piezas);
    }, [tableroCords, piezas]);
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
                            {mapPosPiezas[columna] && (
                                <img
                                    onClick={() =>
                                        mostrarPath(
                                            columna,
                                            mapPosPiezas,
                                            setPosibles,
                                        )
                                    }
                                    className="pieza"
                                    src={data.piezas[mapPosPiezas[columna]]}
                                    alt={columna}
                                />
                            )}
                            {posibles &&
                                posibles.map(
                                    (pos) =>
                                        pos === columna && (
                                            <span
                                                key={columna}
                                                className="posible"
                                            ></span>
                                        ),
                                )}
                        </div>
                    )),
                )}
        </article>
    );
}
