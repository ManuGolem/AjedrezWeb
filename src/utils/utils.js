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
    const pieza = mapPiezas[posicion];
    //"K"-> oponente=Negras, "k"-> oponente=Blancas
    const oponente = turno ? "K" : "k";
    const reyOponente = Object.keys(mapPiezas).find((cord) => mapPiezas[cord] === oponente);
    const posiblesCapturas = posiblesJugadas("captura", posicion, mapPiezas);
    console.log(posiblesCapturas.includes(reyOponente) ? oponente.concat("tiene jaque") : "no hay jaque"); //Listo encontramos cuando uno de los dos tiene jaque
    //Aca hay que llamar a las posibles jugadas de la pieza y manteniendo el turno
    //Luego deberiamos ver si entre las posibles jugadas esta el reyOponente que es la posicion del rey del oponente
}
export { esBlanco, esMiTurno, esJaque, esPosicionValida, hayPiezasEntreMedio };
