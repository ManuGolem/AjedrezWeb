import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { mostrarPath, moverPieza, capturarPieza } from "../utils/mov";
import { esMiTurno, esJaqueMate } from "../utils/esAlgo";
export function Tablero({ start, turno, setTurno, piezasCapturadas, setPiezasCapturadas, jugadas, setJugadas, setMate, setAhogado }) {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    const [posibles, setPosibles] = useState();
    const [capturas, setCapturas] = useState();
    const { tableroCords, piezas } = useStartTablero(start);
    const [movimientos, setMovimientos] = useState([]);
    const [primerMRB, setMRB] = useState(true);
    const [primerMRN, setMRN] = useState(true);
    const [jaque, setJaque] = useState({});
    useEffect(() => {
        setTablero(tableroCords);
        setMapPiezas(piezas);
        setCapturas();
        setPosibles();
        setMRB(true);
        setMRN(true);
        setJugadas([]);
        setPiezasCapturadas({
            blancas: [],
            negras: [],
        });
        setJaque({});
        setTurno(true);
        setMate();
        setAhogado();
    }, [tableroCords, piezas]);
    function mostrarPiezas(columna) {
        return mapPosPiezas[columna] ? (
            <img
                onClick={() =>
                    esMiTurno(turno, columna, mapPosPiezas) && mostrarPath(columna, mapPosPiezas, setPosibles, setCapturas, primerMRB, primerMRN, jaque)
                }
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
                            onClick={() =>
                                moverPieza(
                                    columna,
                                    mapPosPiezas,
                                    setMapPiezas,
                                    setPosibles,
                                    setCapturas,
                                    turno,
                                    setTurno,
                                    setMRB,
                                    setMRN,
                                    movimientos,
                                    setMovimientos,
                                    jugadas,
                                    setJugadas,
                                    setJaque,
                                    jaque,
                                    setAhogado,
                                    setMate,
                                )
                            }
                        >
                            <span key={columna * 2} className="circulo"></span>
                        </span>
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
                                    jugadas,
                                    setJugadas,
                                    movimientos,
                                    setMovimientos,
                                    setJaque,
                                    jaque,
                                    setAhogado,
                                    setMate,
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
                        <div key={`${i}-${j}`} id={columna} className={columna === jaque.rey ? `${data.tablero[columna]} enJaque` : data.tablero[columna]}>
                            {mostrarPiezas(columna)}
                            {mostrarPosiblesMovimientos(columna)}
                            {mostrarPosiblesCapturas(columna)}
                        </div>
                    )),
                )}
        </article>
    );
}
