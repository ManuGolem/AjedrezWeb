import { useGame } from "../context";
import { esMiTurno } from "./esAlgo";
import { moverPieza, capturarPieza, mostrarPath } from "./mov";
import data from "../dictionary.json";
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
        setMate,
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
                            )
                        }
                    ></span>
                ),
        )
        : null;
}
export { MostrarPiezas, MostrarPosiblesMovs, MostrarPosiblesCapturas };
