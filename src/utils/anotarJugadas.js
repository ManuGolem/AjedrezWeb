import { esBlanco } from "./esAlgo";
export function anotarJugadas(
    mapPosPiezas,
    posicion,
    jugadas,
    setJugadas,
    movimientos,
    setMovimientos,
    piezaSeleccionada,
    dejoEnJaque,
    captureAlPaso,
    esMate,
    coronacion,
) {
    if (coronacion) {
        console.log(coronacion);
    }
    const pieza = mapPosPiezas[piezaSeleccionada];
    let esCaptura = mapPosPiezas[posicion];
    captureAlPaso && (esCaptura = true);
    const jaque = dejoEnJaque ? "+" : "";
    const mate = esMate ? "+" : "";
    if (esCaptura) {
        const letra = piezaSeleccionada.split("")[0];
        if (esBlanco(pieza)) {
            const nuevoMov = pieza !== "p" ? [pieza + "x" + posicion + jaque + mate] : [letra + "x" + posicion + jaque + mate];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = (pieza !== "P" ? pieza + "x" + posicion : letra + "x" + posicion) + jaque + mate;
            const nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    } else {
        if (esBlanco(pieza)) {
            if (pieza === "k") {
                let nuevoMov;
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
                const nuevoMov = pieza !== "p" ? [pieza + posicion + jaque + mate] : [posicion + jaque + mate];
                setMovimientos(nuevoMov);
                const jugadaNueva = jugadas;
                jugadaNueva.push(nuevoMov);
                setJugadas(jugadaNueva);
            }
        } else {
            if (pieza === "K") {
                let nuevoMov;
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
                const nuevoMov = movimientos;
                nuevoMov.push(posicion);
                setMovimientos(nuevoMov);
            }
        }
    }
}
