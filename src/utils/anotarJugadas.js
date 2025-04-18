import { esBlanco } from "./utils";
export function anotarJugadas(mapPosPiezas, posicion, jugadas, setJugadas, movimientos, setMovimientos, piezaSeleccionada, dejoEnJaque) {
    const pieza = mapPosPiezas[piezaSeleccionada];
    const esCaptura = mapPosPiezas[posicion];
    const jaque = dejoEnJaque ? "+" : "";
    if (esCaptura) {
        const letra = piezaSeleccionada.split("")[0];
        if (esBlanco(pieza)) {
            const nuevoMov = pieza !== "p" ? [pieza + "x" + posicion + jaque] : [letra + "x" + posicion + jaque];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = (pieza !== "P" ? pieza + "x" + posicion : letra + "x" + posicion) + jaque;
            const nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    } else {
        if (esBlanco(pieza)) {
            const nuevoMov = pieza !== "p" ? [pieza + posicion + jaque] : [posicion + jaque];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = (pieza !== "P" ? pieza + posicion : posicion) + jaque;
            const nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    }
}
