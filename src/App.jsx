import { useState } from "react";
import { ModalDerecho } from "./Components/ModalDerecho";
import { Tablero } from "./Components/Tablero";
import { PiezasCapturadas } from "./Components/PiezasCapturadas";

export function App() {
    const [reinciar, setReiniciar] = useState(true);
    const [turno, setTurno] = useState(true);
    const [piezasCapturadas, setPiezasCapturadas] = useState({
        blancas: [],
        negras: [],
    });
    const [jugadas, setJugadas] = useState([]);
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
            <div>
                <PiezasCapturadas color="negras" piezasCapturadas={piezasCapturadas} />
                <Tablero
                    start={reinciar}
                    turno={turno}
                    setTurno={setTurno}
                    piezasCapturadas={piezasCapturadas}
                    setPiezasCapturadas={setPiezasCapturadas}
                    jugadas={jugadas}
                    setJugadas={setJugadas}
                />
                <div className="tableroCordsLetras">
                    {letras.map((le) => (
                        <p key={le}>{le}</p>
                    ))}
                </div>
                <PiezasCapturadas color="blancas" piezasCapturadas={piezasCapturadas} />
            </div>
            <ModalDerecho reiniciarTablero={toggleReiniciar} jugadas={jugadas} />
        </main>
    );
}
