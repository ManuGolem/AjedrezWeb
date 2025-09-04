import { useEffect, useState } from "react";
import data from "../dictionary.json";
import { useGame } from "../context";
export function useStartTablero(start) {
    const [tableroCords, setTablero] = useState();
    const [piezas, setPiezas] = useState();
    const { setHistorial, setMovActual } = useGame();
    useEffect(() => {
        let tableroAux = Array(8)
            .fill(null)
            .map(() => Array(8).fill(""));
        const arregloUtil = [
            [8, 7, 6, 5, 4, 3, 2, 1],
            ["a", "b", "c", "d", "e", "f", "g", "h"],
        ];
        arregloUtil[0].forEach((columna, indexcol) => {
            arregloUtil[1].forEach((fila, indexfila) => {
                tableroAux[indexcol][indexfila] = `${fila}${columna}`;
            });
        });
        //Seteo el tablero con sus cords
        setTablero(tableroAux);
        setPiezas({ ...data.posicionInicial });
        setHistorial([]);
        setMovActual(-1);
    }, [start]);
    return { tableroCords, piezas };
}
