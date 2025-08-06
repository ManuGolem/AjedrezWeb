import { useGame } from "../context";
import { esMiTurno, esJaqueMate, esAhogado } from "./esAlgo";
import { moverPieza, capturarPieza, mostrarPath } from "./mov";
import { hayJaque } from "./utils";
import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { anotarJugadas } from "./anotarJugadas";
function MostrarPiezas({ columna }) {
    const { mapPosPiezas, setPosibles, setCapturas, primerMRN, primerMRB, jaque, turno } = useGame();
    return mapPosPiezas[columna] ? (
        <img
            onClick={() => esMiTurno(turno, columna, mapPosPiezas) && mostrarPath(columna, mapPosPiezas, setPosibles, setCapturas, primerMRB, primerMRN, jaque)}
            className="pieza"
            src={data.piezas[mapPosPiezas[columna]]}
            alt={columna}
        />
    ) : null;
}
function MostrarPiezasCoronacion({ color }) {
    const {
        turno,
        setJaque,
        setMate,
        setTurno,
        jaque,
        setAhogado,
        setModal,
        llamada,
        mapPosPiezas,
        setMapPiezas,
        setJugadas,
        movimientos,
        setMovimientos,
        jugadas,
    } = useGame();
    const { posicion, piezaSeleccionada } = llamada;
    function llamarAnotar(pieza) {
        const copiaMap = { ...mapPosPiezas };
        copiaMap[piezaSeleccionada] = "";
        copiaMap[posicion] = pieza;
        const dejoEnJaque = hayJaque(copiaMap, turno, setJaque);
        let doyMate = false;
        if (jaque.piezas) {
            doyMate = esJaqueMate(jaque, copiaMap, setMate);
        }
        esAhogado(turno, copiaMap, setAhogado);
        setModal(false);
        const parametrosLlamada = {
            mapPosPiezas,
            posicion,
            jugadas,
            setJugadas,
            movimientos,
            setMovimientos,
            piezaSeleccionada,
            dejoEnJaque,
            esMate: doyMate,
            coronacion: pieza,
            captureAlPaso: false,
        };
        anotarJugadas(parametrosLlamada);
        setMapPiezas(copiaMap);
        setTurno(!turno);
    }
    const [piezas, setPiezas] = useState();
    useEffect(() => {
        if (color === "blanco") {
            setPiezas(["r", "x", "n", "q"]);
        } else {
            setPiezas(["R", "X", "C", "Q"]);
        }
    }, []);
    return <>{piezas && piezas.map((pieza) => <img onClick={() => llamarAnotar(pieza)} className="pieza" src={data.piezas[pieza]} />)}</>;
}
function MostrarPosiblesMovs({ columna }) {
    const {
        posibles,
        setPosibles,
        mapPosPiezas,
        setMapPiezas,
        setCapturas,
        turno,
        setTurno,
        setMRN,
        setMRB,
        movimientos,
        setMovimientos,
        jugadas,
        setJugadas,
        setJaque,
        jaque,
        setAhogado,
        setMate,
        setModal,
        setLlamada,
        setPiezasCapturadas,
        piezasCapturadas,
    } = useGame();
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
                                setModal,
                                setLlamada,
                                setPiezasCapturadas,
                                piezasCapturadas,
                            )
                        }
                    >
                        <span key={columna * 2} className="circulo"></span>
                    </span>
                ),
        )
        : null;
}

function MostrarPosiblesCapturas({ columna }) {
    const {
        capturas,
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
        setModal,
        setMate,
        setLlamada,
    } = useGame();
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
                                setModal,
                                setLlamada,
                            )
                        }
                    ></span>
                ),
        )
        : null;
}
export { MostrarPiezas, MostrarPosiblesMovs, MostrarPiezasCoronacion, MostrarPosiblesCapturas };
