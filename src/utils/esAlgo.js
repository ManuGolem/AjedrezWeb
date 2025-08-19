// Funciones que devuelven true or false como objetivo principal
import { movsLegales } from "./mov";
function esCoronacion(posicion, pieza, setModal) {
    if (!(Number(posicion.split("")[1]) === 8 && pieza === "p") && !(Number(posicion.split("")[1]) === 1 && pieza === "P")) {
        return false;
    } else {
        setModal({
            pieza: pieza === "p" ? "blanco" : "negro",
        });
        return posicion;
    }
}
function esAhogado(turno, mapPosPiezas, setAhogado) {
    const piezas = [];
    Object.entries(mapPosPiezas).forEach(([key, value]) => {
        if (value !== "") {
            if (esBlanco(value) && !turno) {
                piezas.push(key);
            } else if (!esBlanco(value) && turno) {
                piezas.push(key);
            }
        }
    });
    const movimientos = [];
    piezas.forEach((cord) => {
        const mov = movsLegales("movs", false, cord, mapPosPiezas, false, false);
        if (mov.length !== 0) {
            movimientos.push(mov);
        }
        const captura = movsLegales("captura", false, cord, mapPosPiezas, false, false);
        if (captura.length !== 0) {
            movimientos.push(captura);
        }
    });
    if (movimientos.length === 0) {
        setAhogado(true);
        return true;
    }
    return false;
}

function esPeon(pieza) {
    const piezaCode = pieza.charCodeAt(0);
    if ((piezaCode <= "h".charCodeAt(0) && piezaCode >= "a".charCodeAt(0)) || pieza == "O") {
        return true;
    }
    return pieza;
}

function esBlanco(pieza) {
    const letra = pieza.split("")[0];
    if (letra === "p" || letra === "n" || letra === "r" || letra === "q" || letra === "k" || letra === "x") {
        return true;
    }
    return false;
}
function esMiTurno(turno, pos, mapPosPiezas) {
    return turno ? esBlanco(mapPosPiezas[pos]) : !esBlanco(mapPosPiezas[pos]);
}
function esPosicionValida(letra, numero) {
    return numero >= 1 && numero <= 8 && letra >= "a" && letra <= "h";
}
function esCapturaAlPasoValida(peonACapturar, peonCaptura) {
    const cordenadas = peonACapturar.split("");
    const letra = cordenadas[0];
    const numero = Number(cordenadas[1]);
    const cordenadasAProbar = peonCaptura.split("");
    const letraPrueba = cordenadasAProbar[0];
    const numeroPrueba = Number(cordenadasAProbar[1]);
    if (Math.abs(numero - numeroPrueba) > 1) {
        return false;
    }
    if (Math.abs(letra.charCodeAt(0) - letraPrueba.charCodeAt(0)) > 1) {
        return false;
    }
    return true;
}
function esEnroqueValido(pieza, primerMRB, primerMRN, posiblesTapadas) {
    if (pieza === "k" && primerMRB) {
        // Enroque blanco corto (g1)
        if (posiblesTapadas.includes("g1")) {
            if (!posiblesTapadas.includes("f1")) {
                posiblesTapadas = posiblesTapadas.filter((x) => x !== "g1");
            }
        }
        // Enroque blanco largo (c1)
        if (posiblesTapadas.includes("c1")) {
            if (!posiblesTapadas.includes("d1")) {
                posiblesTapadas = posiblesTapadas.filter((x) => x !== "c1");
            }
        }
    } else if (pieza === "K" && primerMRN) {
        // Enroque negro corto (g8)
        if (posiblesTapadas.includes("g8")) {
            if (!posiblesTapadas.includes("f8")) {
                posiblesTapadas = posiblesTapadas.filter((x) => x !== "g8");
            }
        }
        // Enroque negro largo (c8)
        if (posiblesTapadas.includes("c8")) {
            if (!posiblesTapadas.includes("d8")) {
                posiblesTapadas = posiblesTapadas.filter((x) => x !== "c8");
            }
        }
    }
    return posiblesTapadas;
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
export { hayPiezasEntreMedio, esEnroqueValido, esAhogado, esBlanco, esCoronacion, esPosicionValida, esPeon, esMiTurno, esCapturaAlPasoValida };
