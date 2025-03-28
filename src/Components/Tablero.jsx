import data from "../dictionary.json";
import { useEffect, useState } from "react";
import { useStartTablero } from "../Hooks/useStartTablero";
export function Tablero() {
    const [mapPosPiezas, setMapPiezas] = useState();
    const [tablero, setTablero] = useState();
    const [posibles, setPosibles] = useState();
    const { tableroCords, piezas } = useStartTablero();
    useEffect(() => {
        setTablero(tableroCords);
        setMapPiezas(piezas);
    }, [tableroCords, piezas]);
    function mostrarPath(cord) {
        const pieza = mapPosPiezas[cord];
        const cordenadas = cord.split("");
        const letra = cordenadas[0];
        const numero = Number(cordenadas[1]);
        if (pieza === "p") {
            //Peon blanco
            setPosibles([letra.concat(numero + 1), letra.concat(numero + 2)]);
        } else if (pieza === "P") {
            //Peon Negro
            setPosibles([letra.concat(numero - 1), letra.concat(numero - 2)]);
        } else if (pieza === "c") {
            //Caballo blanco
            //Aca tengo que "sumar" letras que creo que lo tengo que hacer con ascii
        } else if (pieza === "C") {
            //Caballo negro
        }
    }
    return (
        <article className="tablero">
            {tablero &&
                tablero.map((fila, i) =>
                    fila.map((columna, j) => (
                        <div
                            key={`${i}-${j}`}
                            id={columna}
                            className={data.tablero[columna]}
                        >
                            {data.piezasStart[columna] && (
                                <img
                                    onClick={() => mostrarPath(columna)}
                                    className="pieza"
                                    src={data.piezasStart[columna]}
                                    alt={columna}
                                />
                            )}
                            {posibles &&
                                posibles.map(
                                    (pos) =>
                                        pos === columna && (
                                            <span className="posible"></span>
                                        ),
                                )}
                        </div>
                    )),
                )}
        </article>
    );
}
