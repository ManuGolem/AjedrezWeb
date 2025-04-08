import { esBlanco } from "./utils";
export function anotarJugadas(mapPosPiezas, posicion, jugadas, setJugadas, movimientos, setMovimientos, piezaSeleccionada) {
    const pieza = mapPosPiezas[piezaSeleccionada];
    const esCaptura = mapPosPiezas[posicion];
    if (esCaptura) {
        const letra = piezaSeleccionada.split("")[0];
        if (esBlanco(pieza)) {
            const nuevoMov = pieza !== "p" ? [pieza + "x" + posicion] : [letra + "x" + posicion];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = pieza !== "P" ? pieza + "x" + posicion : letra + "x" + posicion;
            const nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    } else {
        if (esBlanco(pieza)) {
            const nuevoMov = pieza !== "p" ? [pieza + posicion] : [posicion];
            setMovimientos(nuevoMov);
            const jugadaNueva = jugadas;
            jugadaNueva.push(nuevoMov);
            setJugadas(jugadaNueva);
        } else {
            posicion = pieza !== "P" ? pieza + posicion : posicion;
            const nuevoMov = movimientos;
            nuevoMov.push(posicion);
            setMovimientos(nuevoMov);
        }
    }
}
