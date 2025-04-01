import { useState } from "react";
import { NuevaPartida } from "./Components/NuevaPartida";
import { Tablero } from "./Components/Tablero";
import { PiezasCapturadas } from "./Components/PiezasCapturadas";

export function App() {
    const [reinciar, setReiniciar] = useState(true);
    const [turno, setTurno] = useState(true);
    const [piezasCapturadas, setPiezasCapturadas] = useState({
        blancas: [],
        negras: [],
    });
    const numeros = [8, 7, 6, 5, 4, 3, 2, 1];
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
    function toggleReiniciar() {
        reinciar ? setReiniciar(false) : setReiniciar(true);
    }
    return (
        <main>
            <div className="tableroCordsNums">
                {numeros.map((num) => (
                    <p key={num}>{num}</p>
                ))}
            </div>
            <Tablero start={reinciar} turno={turno} setTurno={setTurno} piezasCapturadas={piezasCapturadas} setPiezasCapturadas={setPiezasCapturadas} />
            <div className="modalIzquierdo">
                <PiezasCapturadas color="negras" piezasCapturadas={piezasCapturadas} />
                <NuevaPartida reiniciarTablero={toggleReiniciar} turno={turno} />
                <PiezasCapturadas color="blancas" piezasCapturadas={piezasCapturadas} />
            </div>
            <div className="tableroCordsLetras">
                {letras.map((le) => (
                    <p key={le}>{le}</p>
                ))}
            </div>
        </main>
    );
}
