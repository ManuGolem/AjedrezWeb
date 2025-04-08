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

export { esBlanco, esMiTurno, esPosicionValida, hayPiezasEntreMedio };
