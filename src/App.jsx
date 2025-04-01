import { useState } from "react";
import { NuevaPartida } from "./Components/NuevaPartida";
import { Tablero } from "./Components/Tablero";

export function App() {
    const [reinciar, setReiniciar] = useState(true);
    const [juego, setJuego] = useState(false);
    function toggleReiniciar() {
        reinciar ? setReiniciar(false) : setReiniciar(true);
    }
    return (
        <>
            <Tablero start={reinciar} retornarTurno={setJuego} />
            <NuevaPartida reiniciarTablero={toggleReiniciar} turno={juego} />
        </>
    );
}
