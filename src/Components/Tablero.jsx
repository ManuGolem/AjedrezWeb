import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { mostrarPath, moverPieza, capturarPieza } from "../utils/mov";
export function Tablero({ start }) {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    const [posibles, setPosibles] = useState();
    const [capturas, setCapturas] = useState();
    const { tableroCords, piezas } = useStartTablero(start);

    useEffect(() => {
        setTablero(tableroCords);
        setMapPiezas(piezas);
        setCapturas();
        setPosibles();
    }, [tableroCords, piezas]);

    return (
        <article className="tablero">
            {tablero &&
                tablero.map((fila, i) =>
                    fila.map((columna, j) => (
                        <div key={`${i}-${j}`} id={columna} className={data.tablero[columna]}>
                            {mapPosPiezas[columna] && (
                                <img
                                    onClick={() => mostrarPath(columna, mapPosPiezas, setPosibles, setCapturas)}
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
                                                onClick={() => moverPieza(columna, mapPosPiezas, setMapPiezas, setPosibles, setCapturas)}
                                            ></span>
                                        ),
                                )}
                            {capturas &&
                                capturas.map(
                                    (pos) =>
                                        pos == columna && (
                                            <span
                                                key={columna}
                                                className="captura"
                                                onClick={() => capturarPieza(columna, mapPosPiezas, setMapPiezas, setPosibles, setCapturas)}
                                            ></span>
                                        ),
                                )}
                        </div>
                    )),
                )}
        </article>
    );
}
