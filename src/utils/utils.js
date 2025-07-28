import { posiblesJugadas } from "./mov";
import { esBlanco, esJaque, esEnroqueValido } from "./esAlgo";
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
function hayJaque(mapPosPiezas, turno, setJaque) {
    const piezasBlancas = [];
    const piezasNegras = [];
    Object.entries(mapPosPiezas).forEach(([key, value]) => {
        if (value !== "") {
            if (esBlanco(value)) {
                piezasBlancas.push(key);
            } else {
                piezasNegras.push(key);
            }
        }
    });
    let hayProblema = false;
    if (!turno) {
        //Posible jaque a blancas
        piezasNegras.forEach((cord) => {
            if (esJaque(cord, mapPosPiezas, turno, setJaque) && !hayProblema) {
                hayProblema = true;
            }
        });
    } else {
        //Posible jaque a Negras
        piezasBlancas.forEach((cord) => {
            if (esJaque(cord, mapPosPiezas, turno, setJaque) && !hayProblema) {
                hayProblema = true;
            }
        });
    }
    return hayProblema;
}
function movsLegales(accion, jaque, cords, mapPosPiezas, primerMRB, primerMRN) {
    const pieza = mapPosPiezas[cords];
    //Turno aca representa el turno opuesto
    let turno;
    if (jaque.piezas) {
        turno = jaque.piezas === "negras" ? true : false;
    } else {
        turno = esBlanco(mapPosPiezas[cords]) ? false : true;
    }
    let posiblesTapadas = [];

    if (accion === "movs") {
        const posiblesJugadasPieza = posiblesJugadas(accion, cords, mapPosPiezas, primerMRB, primerMRN);
        //Jugadas para tapar
        posiblesJugadasPieza.forEach((jugada) => {
            const copiaMap = { ...mapPosPiezas };
            copiaMap[cords] = "";
            copiaMap[jugada] = pieza;
            const hayProblema = hayJaque(copiaMap, turno, false);
            !hayProblema && posiblesTapadas.push(jugada);
            // Aca manejo el caso donde la posicion de enroque no esta siendo atacado, pero el camino hacia esa posicion, si esta siendo atacado
            posiblesTapadas = esEnroqueValido(pieza, primerMRB, primerMRN, posiblesTapadas);
        });
    } else {
        const posiblesCapturasPieza = posiblesJugadas(accion, cords, mapPosPiezas, primerMRB, primerMRN);
        posiblesCapturasPieza.forEach((captura) => {
            const copiaMap = { ...mapPosPiezas };
            copiaMap[cords] = "";
            copiaMap[captura] = mapPosPiezas[cords];
            const hayProblema = hayJaque(copiaMap, turno, false);

            !hayProblema && posiblesTapadas.push(captura);
        });
    }
    return posiblesTapadas;
}
export { hayPiezasEntreMedio, movsLegales, hayJaque };
