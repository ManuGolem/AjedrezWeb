import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { mostrarPath, moverPieza, capturarPieza, esMiTurno } from "../utils/mov";
export function Tablero({ start, turno, setTurno, piezasCapturadas, setPiezasCapturadas }) {
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
        setPiezasCapturadas({
            blancas: [],
            negras: [],
        });
        setTurno(true);
    }, [tableroCords, piezas]);
    function mostrarPiezas(columna) {
        return mapPosPiezas[columna] ? (
            <img
                onClick={() => esMiTurno(turno, columna, mapPosPiezas) && mostrarPath(columna, mapPosPiezas, setPosibles, setCapturas)}
                className="pieza"
                src={data.piezas[mapPosPiezas[columna]]}
                alt={columna}
            />
        ) : null;
    }
    function mostrarPosiblesMovimientos(columna) {
        return posibles
            ? posibles.map(
                (pos) =>
                    pos === columna && (
                        <span
                            key={columna}
                            className="posible"
                            onClick={() => moverPieza(columna, mapPosPiezas, setMapPiezas, setPosibles, setCapturas, turno, setTurno)}
                        ></span>
                    ),
            )
            : null;
    }
    function mostrarPosiblesCapturas(columna) {
        return capturas
            ? capturas.map(
                (pos) =>
                    pos == columna && (
                        <span
                            key={columna}
                            className="captura"
                            onClick={() =>
                                capturarPieza(
                                    columna,
                                    mapPosPiezas,
                                    setMapPiezas,
                                    setPosibles,
                                    setCapturas,
                                    turno,
                                    setTurno,
                                    piezasCapturadas,
                                    setPiezasCapturadas,
                                )
                            }
                        ></span>
                    ),
            )
            : null;
    }
    return (
        <article className="tablero">
            {tablero &&
                tablero.map((fila, i) =>
                    fila.map((columna, j) => (
                        <div key={`${i}-${j}`} id={columna} className={data.tablero[columna]}>
                            {mostrarPiezas(columna)}
                            {mostrarPosiblesMovimientos(columna)}
                            {mostrarPosiblesCapturas(columna)}
                        </div>
                    )),
                )}
        </article>
    );
}
