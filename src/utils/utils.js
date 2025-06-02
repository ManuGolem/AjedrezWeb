import { posiblesJugadas } from "./mov";
function esBlanco(pieza) {
    const letra = pieza.split("")[0];
    if (letra === "p" || letra === "n" || letra === "r" || letra === "q" || letra === "k" || letra === "b") {
        return true;
    }
    return false;
}
function esMiTurno(turno, pos, mapPosPiezas) {
    const devolver = turno ? esBlanco(mapPosPiezas[pos]) : !esBlanco(mapPosPiezas[pos]);
    return devolver;
}
function esPosicionValida(letra, numero) {
    return numero >= 1 && numero <= 8 && letra >= "a" && letra <= "h";
}
function hayPiezasEntreMedio(posInicial, posFinal, mapPosPiezas, piezaPorMover) {
    if (piezaPorMover.toUpperCase() === "K" || piezaPorMover.toUpperCase() == "R") {
        const partesInicial = posInicial.split("");
        const partesFinal = posFinal.split("");
        const letraDePosInicial = partesInicial[0].charCodeAt(0);
        const numeroDePosInicial = partesInicial[1];
        const letraDePosFinal = partesFinal[0].charCodeAt(0);
        const numeroDePosFinal = partesFinal[1];
        if (numeroDePosInicial === numeroDePosFinal) {
            //Caso enroque del rey
            const numero = numeroDePosInicial;

            if (letraDePosInicial < letraDePosFinal) {
                for (let i = letraDePosInicial + 1; i < letraDePosFinal; i++) {
                    if (mapPosPiezas[String.fromCharCode(i) + numero]) {
                        return true;
                    }
                }
            } else {
                for (let i = letraDePosInicial - 1; i > letraDePosFinal; i--) {
                    if (mapPosPiezas[String.fromCharCode(i) + numero]) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function esJaque(posicion, mapPiezas, turno, setJaque) {
    //"K"-> oponente=Negras, "k"-> oponente=Blancas
    const oponente = turno ? "K" : "k";
    const reyOponente = Object.keys(mapPiezas).find((cord) => mapPiezas[cord] === oponente);
    const posiblesCapturas = posiblesJugadas("captura", posicion, mapPiezas);
    console.log("Es jaque?", posicion, turno, posiblesCapturas);
    if (posiblesCapturas.includes(reyOponente)) {
        setJaque &&
            (oponente === "K"
                ? setJaque({
                    piezas: "negras",
                    lugar: posicion,
                    rey: reyOponente,
                })
                : setJaque({
                    piezas: "blancas",
                    lugar: posicion,
                    rey: reyOponente,
                }));
        return true;
    }
    return false;
}
function tapoJaque(accion, jaque, cords, mapPosPiezas) {
    const pieza = mapPosPiezas[cords];
    const turno = jaque.piezas === "negras" ? true : false;
    let posiblesTapadas = [];
    if (accion === "movs") {
        const posiblesJugadasPieza = posiblesJugadas(accion, cords, mapPosPiezas, false, false);
        posiblesJugadasPieza.forEach((jugada) => {
            const copiaMap = { ...mapPosPiezas };
            copiaMap[cords] = "";
            copiaMap[jugada] = pieza;
            !esJaque(jaque.lugar, copiaMap, turno, false) && posiblesTapadas.push(jugada);
        });
    } else {
        const posiblesCapturasPieza = posiblesJugadas(accion, cords, mapPosPiezas, false, false);
        posiblesCapturasPieza.forEach((captura) => {
            const copiaMap = { ...mapPosPiezas };
            copiaMap[cords] = "";
            copiaMap[captura] = mapPosPiezas[cords];
            !esJaque(jaque.lugar, copiaMap, turno, false) && posiblesTapadas.push(captura);
        });
    }
    return posiblesTapadas;
}
export { esBlanco, esMiTurno, esJaque, esPosicionValida, hayPiezasEntreMedio, tapoJaque };
