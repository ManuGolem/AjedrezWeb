import { useState } from "react";
import { NuevaPartida } from "./Components/NuevaPartida";
import { Tablero } from "./Components/Tablero";

export function App() {
    const [reinciar, setReiniciar] = useState(true);
    function toggleReiniciar() {
        reinciar ? setReiniciar(false) : setReiniciar(true);
    }
    return (
        <>
            <Tablero start={reinciar} />
            <NuevaPartida reiniciarTablero={toggleReiniciar} />
        </>
    );
}
