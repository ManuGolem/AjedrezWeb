import data from "../dictionary.json";
import { useEffect, useRef } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
import { MostrarPiezas, MostrarPosiblesCapturas, MostrarPiezasCoronacion, MostrarPosiblesMovs } from "../utils/mostrar";
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
        modal,
        setMirandoHistorial,
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
        setMirandoHistorial(false);
    }, [tableroCords, piezas]);
    const dialogRef = useRef(null);
    useEffect(() => {
        if (modal && !dialogRef.current?.open) {
            dialogRef.current.showModal();
        } else if (modal === false && dialogRef.current?.open) {
            dialogRef.current.close();
        }
    }, [modal]);
    return (
        <article className="tablero">
            {modal && (
                <dialog ref={dialogRef} open className="modal">
                    <div className="coronar">
                        <MostrarPiezasCoronacion color={modal.pieza} />
                    </div>
                </dialog>
            )}
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
