import data from "../dictionary.json";
import { useGame } from "../context";
import { useEffect, useState } from "react";
export function PiezasCapturadas({ color }) {
    const { piezasCapturadas } = useGame();
    const [puntos, setPuntos] = useState({ blancos: 0, negros: 0 });
    useEffect(() => {
        //Hay que iterar sobre cada array, el objeto piezasCapturadas tiene dos array
        const puntosNuevos = { blancos: 0, negros: 0 };
        piezasCapturadas.blancas.forEach((pieza) => {
            if (pieza === "P") {
                puntosNuevos.blancos++;
            } else if (pieza === "X" || pieza === "C") {
                puntosNuevos.blancos += 3;
            } else if (pieza === "R") {
                puntosNuevos.blancos += 5;
            } else {
                puntosNuevos.blancos += 9;
            }
        });
        piezasCapturadas.negras.forEach((pieza) => {
            if (pieza === "p") {
                puntosNuevos.negros++;
            } else if (pieza === "x" || pieza === "n") {
                puntosNuevos.negros += 3;
            } else if (pieza === "r") {
                puntosNuevos.negros += 5;
            } else {
                puntosNuevos.negros += 9;
            }
        });
        if (puntosNuevos.blancos >= puntosNuevos.negros) {
            puntosNuevos.blancos -= puntosNuevos.negros;
            puntosNuevos.negros = 0;
        } else {
            puntosNuevos.negros -= puntosNuevos.blancos;
            puntosNuevos.blancos = 0;
        }
        setPuntos(puntosNuevos);
    }, [piezasCapturadas]);
    return (
        <div className="piezasCapturadas">
            <h1>{color == "negras" ? "Negras" : "Blancas"}</h1>
            <div className="containerPiezasCapt">
                {piezasCapturadas[color].map((pieza) => (
                    <img className="piezaMuestra" src={data.piezas[pieza]} alt={pieza} />
                ))}
                {color == "negras" ? puntos.negros > 0 && <p>+{puntos.negros}</p> : puntos.blancos > 0 && <p>+{puntos.blancos}</p>}
            </div>
        </div>
    );
}
