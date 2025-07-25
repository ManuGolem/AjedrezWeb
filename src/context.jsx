import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ start, children }) {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    const [posibles, setPosibles] = useState();
    const [capturas, setCapturas] = useState();
    const [movimientos, setMovimientos] = useState([]);
    const [primerMRB, setMRB] = useState(true);
    const [primerMRN, setMRN] = useState(true);
    const [jaque, setJaque] = useState({});
    const [jugadas, setJugadas] = useState([]);
    const [piezasCapturadas, setPiezasCapturadas] = useState({ blancas: [], negras: [] });
    const [turno, setTurno] = useState(true);
    const [mate, setMate] = useState();
    const [ahogado, setAhogado] = useState();
    const [modal, setModal] = useState();
    const [llamada, setLlamada] = useState();

    return (
        <GameContext.Provider
            value={{
                llamada,
                setLlamada,
                mapPosPiezas,
                setMapPiezas,
                tablero,
                setTablero,
                posibles,
                setPosibles,
                capturas,
                setCapturas,
                movimientos,
                setMovimientos,
                primerMRB,
                setMRB,
                primerMRN,
                setMRN,
                jaque,
                setJaque,
                jugadas,
                setJugadas,
                piezasCapturadas,
                setPiezasCapturadas,
                turno,
                setTurno,
                mate,
                setMate,
                ahogado,
                setAhogado,
                start,
                modal,
                setModal,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}
