import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { esMiTurno, esJaqueMate } from "../utils/esAlgo";
import { MostrarPiezas, MostrarPosiblesCapturas, MostrarPosiblesMovs } from "../utils/mostrar";
import { useGame } from "../context";
export function Tablero() {
    const {
        start,
        setMapPiezas,
        tablero,
        setTablero,
        setPosibles,
        setCapturas,
        setMRB,
        setMRN,
        jaque,
        setJaque,
        setJugadas,
        setPiezasCapturadas,
        setTurno,
        setMate,
        setAhogado,
    } = useGame();
    const { tableroCords, piezas } = useStartTablero(start);
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
    return (
        <article className="tablero">
            {tablero &&
                tablero.map((fila, i) =>
                    fila.map((columna, j) => (
                        <div key={`${i}-${j}`} id={columna} className={columna === jaque.rey ? `${data.tablero[columna]} enJaque` : data.tablero[columna]}>
                            <MostrarPiezas columna={columna} />
                            <MostrarPosiblesMovs columna={columna} />
                            <MostrarPosiblesCapturas columna={columna} />
                        </div>
                    )),
                )}
        </article>
    );
}
