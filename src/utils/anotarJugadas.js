import { esBlanco } from "./esAlgo";
export function anotarJugadas(parametros) {
    let { mapPosPiezas, posicion, piezaSeleccionada, captureAlPaso } = parametros;
    let { movimientos, setMovimientos } = parametros;
    let { jugadas, setJugadas } = parametros;
    let { dejoEnJaque, esMate, coronacion } = parametros;
    let pieza = mapPosPiezas[piezaSeleccionada];
    let esCaptura = mapPosPiezas[posicion];
    captureAlPaso && (esCaptura = true);
    const jaque = dejoEnJaque ? "+" : "";
    const mate = esMate ? "+" : "";
    let piezaAcoronar = "";
    if (coronacion) {
        pieza = esBlanco(coronacion) ? "p" : "P";
        piezaAcoronar = "=" + coronacion;
    }
    let nuevoMov;
    if (esCaptura) {
        const letra = piezaSeleccionada.split("")[0];
        if (esBlanco(pieza)) {
            nuevoMov = pieza !== "p" ? [pieza + "x" + posicion + jaque + mate] : [letra + "x" + posicion + piezaAcoronar + jaque + mate];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = (pieza !== "P" ? pieza + "x" + posicion : letra + "x" + posicion + piezaAcoronar) + jaque + mate;
            nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    } else {
        if (esBlanco(pieza)) {
            if (pieza === "k") {
                //Veo si el movimiento es un enroque
                if (posicion === "g1") {
                    nuevoMov = ["O-O" + jaque + mate];
                } else if (posicion === "c1") {
                    nuevoMov = ["O-O-O" + jaque];
                } else {
                    nuevoMov = [pieza + posicion + jaque + mate];
                }
                setMovimientos(nuevoMov);
                const jugadaNueva = jugadas;
                jugadaNueva.push(nuevoMov);
                setJugadas(jugadaNueva);
            } else {
                nuevoMov = pieza !== "p" ? [pieza + posicion + jaque + mate] : [posicion + piezaAcoronar + jaque + mate];
                setMovimientos(nuevoMov);
                const jugadaNueva = jugadas;
                jugadaNueva.push(nuevoMov);
                setJugadas(jugadaNueva);
            }
        } else {
            if (pieza === "K") {
                //Veo si el movimiento es un enroque
                if (posicion === "g8") {
                    nuevoMov = "O-O" + jaque + mate;
                } else if (posicion === "c8") {
                    nuevoMov = "O-O-O" + jaque + mate;
                } else {
                    nuevoMov = pieza + posicion + jaque + mate;
                }
                const copiaMovs = movimientos;
                copiaMovs.push(nuevoMov);
                setMovimientos(copiaMovs);
            } else {
                posicion = (pieza !== "P" ? pieza + posicion : posicion) + jaque + mate;
                nuevoMov = movimientos;
                nuevoMov.push(posicion);
                setMovimientos(nuevoMov);
            }
        }
    }
    if (nuevoMov.length > 1) {
        nuevoMov = nuevoMov[1];
    } else {
        nuevoMov = nuevoMov[0];
    }
    return nuevoMov;
}
