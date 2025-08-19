// Funciones relacionadas a movimientos
import { hacerEnroque, buscarPosiblesJugadas } from "./hacer";
import { esBlanco, esPosicionValida, esEnroqueValido } from "./esAlgo";
import { hayJaque } from "./jaque";
const MovsCaballo = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
];
function movimientosTorre(letraCode, numero, mapPosPiezas, letra) {
    const movimientos = [];
    const capturas = [];
    const direcciones = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    direcciones.forEach(([deltaLetra, deltaNumero]) => {
        for (let i = 1; i < 8; i++) {
            const nuevaLetra = String.fromCharCode(letraCode + deltaLetra * i);
            const nuevoNumero = numero + deltaNumero * i;
            const posicion = nuevaLetra + nuevoNumero;

            if (!esPosicionValida(nuevaLetra, nuevoNumero)) break;

            if (letra === "r" || letra === "q") {
                if (mapPosPiezas[posicion]) {
                    if (!esBlanco(mapPosPiezas[posicion])) {
                        capturas.push(posicion);
                        break;
                    } else {
                        break;
                    }
                } else {
                    movimientos.push(posicion);
                }
            } else {
                if (mapPosPiezas[posicion]) {
                    if (esBlanco(mapPosPiezas[posicion])) {
                        capturas.push(posicion);
                        break;
                    } else {
                        break;
                    }
                } else {
                    movimientos.push(posicion);
                }
            }
        }
    });
    return { movimientos, capturas };
}
function movimientoRey(letraCode, numero, mapPosPiezas, letra, primerMRB, primerMRN) {
    const movimientos = [];
    const capturas = [];

    // Todas las direcciones adyacentes
    for (let deltaLetra = -1; deltaLetra <= 1; deltaLetra++) {
        for (let deltaNumero = -1; deltaNumero <= 1; deltaNumero++) {
            if (deltaLetra === 0 && deltaNumero === 0) continue;

            const nuevaLetra = String.fromCharCode(letraCode + deltaLetra);
            const nuevoNumero = numero + deltaNumero;
            const posicion = nuevaLetra + nuevoNumero;

            if (esPosicionValida(nuevaLetra, nuevoNumero)) {
                if (!mapPosPiezas[posicion]) {
                    movimientos.push(posicion);
                } else {
                    if (letra === "k") {
                        //Rey blanco
                        if (!esBlanco(mapPosPiezas[posicion])) {
                            capturas.push(posicion);
                        }
                    } else {
                        //Rey negro
                        if (esBlanco(mapPosPiezas[posicion])) {
                            capturas.push(posicion);
                        }
                    }
                }
            }
        }
    }
    const letraCorto = String.fromCharCode(letraCode + 2);
    const letraLargo = String.fromCharCode(letraCode - 2);
    const torreCorto = String.fromCharCode(letraCode + 3) + numero;
    const torreLargo = String.fromCharCode(letraCode - 4) + numero;

    if (letra === "k") {
        //Rey blanco
        if (primerMRB) {
            hacerEnroque("r", letraCorto, numero, torreCorto, mapPosPiezas, movimientos);
            hacerEnroque("r", letraLargo, numero, torreLargo, mapPosPiezas, movimientos);
        }
    } else {
        //Rey negro
        if (primerMRN) {
            hacerEnroque("R", letraCorto, numero, torreCorto, mapPosPiezas, movimientos);
            hacerEnroque("R", letraLargo, numero, torreLargo, mapPosPiezas, movimientos);
        }
    }

    return { movimientos, capturas };
}
function movimientosAlfil(letraCode, numero, mapPosPiezas, letra) {
    const movimientos = [];
    const capturas = [];
    const direcciones = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
    ];
    direcciones.forEach(([deltaLetra, deltaNumero]) => {
        for (let i = 1; i < 8; i++) {
            const nuevaLetra = String.fromCharCode(letraCode + deltaLetra * i);
            const nuevoNumero = numero + deltaNumero * i;
            const posicion = nuevaLetra + nuevoNumero;

            if (!esPosicionValida(nuevaLetra, nuevoNumero)) break;
            if (letra === "x" || letra === "q") {
                if (mapPosPiezas[posicion]) {
                    if (!esBlanco(mapPosPiezas[posicion])) {
                        capturas.push(posicion);
                        break;
                    } else {
                        break;
                    }
                } else {
                    movimientos.push(posicion);
                }
            } else {
                if (mapPosPiezas[posicion]) {
                    if (esBlanco(mapPosPiezas[posicion])) {
                        capturas.push(posicion);
                        break;
                    } else {
                        break;
                    }
                } else {
                    movimientos.push(posicion);
                }
            }
        }
    });

    return { movimientos, capturas };
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
    const posiblesJugadasPieza = buscarPosiblesJugadas(accion, cords, mapPosPiezas, primerMRB, primerMRN);
    posiblesJugadasPieza.forEach((jugada) => {
        const copiaMap = { ...mapPosPiezas };
        copiaMap[cords] = "";
        if (accion === "movs") {
            copiaMap[jugada] = pieza;
        } else {
            copiaMap[jugada] = mapPosPiezas[cords];
        }
        const hayProblema = hayJaque(copiaMap, turno, false);
        !hayProblema && posiblesTapadas.push(jugada);
        // Aca manejo el caso donde la posicion de enroque no esta siendo atacado, pero el camino hacia esa posicion, si esta siendo atacado
        // Si estamos en ese caso, elimino todas estas posibles jugadas pero mantengo las otras (por eso la asignacion y no push)
        posiblesTapadas = esEnroqueValido(pieza, primerMRB, primerMRN, posiblesTapadas);
    });
    return posiblesTapadas;
}
export { MovsCaballo, movimientosAlfil, movimientosTorre, movimientoRey, movsLegales };
