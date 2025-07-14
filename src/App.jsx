import { useState } from "react";
import { ModalDerecho } from "./Components/ModalDerecho";
import { Tablero } from "./Components/Tablero";
import { PiezasCapturadas } from "./Components/PiezasCapturadas";
import { GameProvider } from "./context";
export function App() {
    const [reinciar, setReiniciar] = useState(true);
    const numeros = [8, 7, 6, 5, 4, 3, 2, 1];
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
    function toggleReiniciar() {
        reinciar ? setReiniciar(false) : setReiniciar(true);
    }
    return (
        <main>
            <GameProvider start={reinciar}>
                <div className="tableroCordsNums">
                    {numeros.map((num) => (
                        <p key={num}>{num}</p>
                    ))}
                </div>
                <div>
                    <PiezasCapturadas color="negras" />
                    <Tablero />
                    <div className="tableroCordsLetras">
                        {letras.map((le) => (
                            <p key={le}>{le}</p>
                        ))}
                    </div>
                    <PiezasCapturadas color="blancas" />
                </div>
                <ModalDerecho reiniciarTablero={toggleReiniciar} />
            </GameProvider>
        </main>
    );
}
