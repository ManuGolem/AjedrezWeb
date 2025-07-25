import { movsLegales, hayJaque } from "./utils";
import { anotarJugadas } from "./anotarJugadas";
import { hacerEnroque } from "./hacer";
import { esAhogado, esBlanco, esCoronacion, esPosicionValida, esJaqueMate, esCapturaAlPasoValida } from "./esAlgo";
let posicionCapturaAlPaso = "";
let captureAlPaso = false;
let secondChance = false;
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
//Aca deberia usar un state
let piezaSeleccionada;
export function capturarPieza(
    cordenada,
    mapPosPiezas,
    setMapPiezas,
    setPosibles,
    setCapturas,
    turno,
    setTurno,
    piezasCapturadas,
    setPiezasCapturadas,
    jugadas,
    setJugadas,
    movimientos,
    setMovimientos,
    setJaque,
    jaque,
    setAhogado,
    setMate,
    setModal,
    setLlamada,
) {
    //Parte para guardar las piezas que se van capturando
    const piezaACapturar = mapPosPiezas[cordenada];
    const copiaPiezas = { ...piezasCapturadas };
    const colorPieza = esBlanco(piezaACapturar) ? "negras" : "blancas";
    copiaPiezas[colorPieza].push(piezaACapturar);
    setPiezasCapturadas(copiaPiezas);
    //Logica para mover la pieza
    const posicion = cordenada;
    const piezaAMover = mapPosPiezas[piezaSeleccionada];
    const copiaMap = { ...mapPosPiezas };
    copiaMap[piezaSeleccionada] = "";
    copiaMap[cordenada] = piezaAMover;
    setJaque({});
    const coronacion = esCoronacion(posicion, piezaAMover, setModal);
    if (!coronacion) {
        //Saber si el movimiento deja en jaque al oponente y setear el jaque al oponente
        const dejoEnJaque = hayJaque(copiaMap, turno, setJaque);
        let doyMate = false;
        if (dejoEnJaque) {
            doyMate = esJaqueMate(jaque, copiaMap, setMate);
        }
        esAhogado(turno, copiaMap, setAhogado);
        anotarJugadas(mapPosPiezas, posicion, jugadas, setJugadas, movimientos, setMovimientos, piezaSeleccionada, dejoEnJaque, false, doyMate, false);
        setMapPiezas(copiaMap);
        setTurno(!turno);
    } else {
        setLlamada({ posicion, piezaSeleccionada });
    }
    setPosibles();
    setCapturas();
}
export function moverPieza(
    posicion,
    mapPosPiezas,
    setMapPiezas,
    setPosibles,
    setCapturas,
    turno,
    setTurno,
    setMRB,
    setMRN,
    movimientos,
    setMovimientos,
    jugadas,
    setJugadas,
    setJaque,
    jaque,
    setAhogado,
    setMate,
    setModal,
    setLlamada,
    setPiezasCapturadas,
    piezasCapturadas,
) {
    const piezaAMover = mapPosPiezas[piezaSeleccionada];
    const copiaMap = { ...mapPosPiezas };
    //Caso en el que haya que hacer un enroque
    if (piezaAMover === "k" || piezaAMover === "K") {
        const partes = posicion.split("");
        const numeroTorre = partes[1];
        const letra = String.fromCharCode(partes[0].charCodeAt(0));
        if (Math.abs(partes[0].charCodeAt(0) - piezaSeleccionada.split("")[0].charCodeAt(0)) > 1) {
            const torrePos = letra === "g" ? "h" : "a";
            const torreAMover = letra === "g" ? "f" : "d";
            const letraTorre = piezaAMover === "k" ? "r" : "R";
            copiaMap[piezaSeleccionada] = "";
            copiaMap[posicion] = piezaAMover;
            copiaMap[torrePos + numeroTorre] = "";
            copiaMap[torreAMover + numeroTorre] = letraTorre;
        } else {
            copiaMap[piezaSeleccionada] = "";
            copiaMap[posicion] = piezaAMover;
        }
        piezaAMover === "k" && setMRB(false);
        piezaAMover === "K" && setMRN(false);
    } else {
        //Resto de piezas
        //Caso captura al paso, hay que setear a todo peon que avanze dos casillas.
        if (piezaAMover === "p" || piezaAMover === "P") {
            if (posicionCapturaAlPaso !== "" && posicionCapturaAlPaso.split("")[0] === posicion.split("")[0]) {
                copiaMap[posicionCapturaAlPaso] = "";
                posicionCapturaAlPaso = "";
                captureAlPaso = true;
                //Setear la captura
                const copiaPiezas = { ...piezasCapturadas };
                const piezaComida = piezaAMover === "p" ? "P" : "p";
                const colorPieza = esBlanco(piezaAMover) ? "blancas" : "negras";
                copiaPiezas[colorPieza].push(piezaComida);
                setPiezasCapturadas(copiaPiezas);
            }
            if (Math.abs(posicion.split("")[1] - piezaSeleccionada.split("")[1]) > 1) {
                const posiblePeon1 = String.fromCharCode(posicion.split("")[0].charCodeAt(0) + 1) + posicion.split("")[1];
                const posiblePeon2 = String.fromCharCode(posicion.split("")[0].charCodeAt(0) - 1) + posicion.split("")[1];
                if (
                    (turno && (mapPosPiezas[posiblePeon1] === "P" || mapPosPiezas[posiblePeon2] === "P")) ||
                    (!turno && (mapPosPiezas[posiblePeon1] === "p" || mapPosPiezas[posiblePeon2] === "p"))
                ) {
                    posicionCapturaAlPaso = posicion;
                    secondChance = true;
                }
            }
        }
        copiaMap[piezaSeleccionada] = "";
        copiaMap[posicion] = piezaAMover;
    }
    setJaque({});
    const coronacion = esCoronacion(posicion, piezaAMover, setModal);
    if (!coronacion) {
        //Saber si el movimiento deja en jaque al oponente y setear el jaque al oponente
        const dejoEnJaque = hayJaque(copiaMap, turno, setJaque);
        let doyMate = false;
        if (dejoEnJaque) {
            doyMate = esJaqueMate(jaque, copiaMap, setMate);
        }
        esAhogado(turno, copiaMap, setAhogado);
        anotarJugadas(mapPosPiezas, posicion, jugadas, setJugadas, movimientos, setMovimientos, piezaSeleccionada, dejoEnJaque, captureAlPaso, doyMate, false);
        setMapPiezas(copiaMap);
        setTurno(!turno);
    } else {
        setLlamada({ posicion, piezaSeleccionada });
    }
    captureAlPaso = false;
    if (secondChance) {
        secondChance = false;
    } else {
        posicionCapturaAlPaso = "";
    }
    setPosibles();
    setCapturas();
}

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
export function posiblesJugadas(orden, cord, mapPosPiezas, primerMRB, primerMRN) {
    const pieza = mapPosPiezas[cord];
    const cordenadas = cord.split("");
    const letra = cordenadas[0];
    const numero = Number(cordenadas[1]);
    const letraCode = letra.charCodeAt(0);
    let posiblesMovs = [];
    let posiblesCapturas = [];
    if (pieza === "p") {
        //Peon blanco
        const mov1 = letra + (numero + 1);
        if (!mapPosPiezas[mov1]) {
            posiblesMovs.push(mov1);
            if (numero == 2) {
                const mov2 = letra + (numero + 2);
                if (!mapPosPiezas[mov2]) {
                    posiblesMovs.push(mov2);
                }
            }
        }
        if (posicionCapturaAlPaso !== "") {
            const posicionNueva = posicionCapturaAlPaso.split("")[0] + (Number(posicionCapturaAlPaso.split("")[1]) + 1);
            //Aca tengo que ver que posicionNueva sea posible para los peones
            if (esCapturaAlPasoValida(posicionNueva, cord)) {
                posiblesMovs.push(posicionNueva);
            }
        }
        const captura1 = String.fromCharCode(letraCode + 1) + (numero + 1);
        const captura2 = String.fromCharCode(letraCode - 1) + (numero + 1);
        mapPosPiezas[captura1] && !esBlanco(mapPosPiezas[captura1]) && posiblesCapturas.push(captura1);
        mapPosPiezas[captura2] && !esBlanco(mapPosPiezas[captura2]) && posiblesCapturas.push(captura2);
    } else if (pieza === "P") {
        //Peon Negro
        const mov1 = letra + (numero - 1);
        if (!mapPosPiezas[mov1]) {
            posiblesMovs.push(mov1);
            if (numero == 7) {
                const mov2 = letra + (numero - 2);
                if (!mapPosPiezas[mov2]) {
                    posiblesMovs.push(mov2);
                }
            }
        }
        if (posicionCapturaAlPaso !== "") {
            const posicionNueva = posicionCapturaAlPaso.split("")[0] + (Number(posicionCapturaAlPaso.split("")[1]) - 1);
            if (esCapturaAlPasoValida(posicionNueva, cord)) {
                posiblesMovs.push(posicionNueva);
            }
        }

        const captura1 = String.fromCharCode(letraCode + 1) + (numero - 1);
        const captura2 = String.fromCharCode(letraCode - 1) + (numero - 1);
        mapPosPiezas[captura1] && esBlanco(mapPosPiezas[captura1]) && posiblesCapturas.push(captura1);
        mapPosPiezas[captura2] && esBlanco(mapPosPiezas[captura2]) && posiblesCapturas.push(captura2);
    } else if (pieza === "n" || pieza === "C") {
        //Caballos
        MovsCaballo.forEach(([cambioLetra, cambioNumero]) => {
            const nuevaLetra = String.fromCharCode(letraCode + cambioLetra);
            const nuevoNumero = numero + cambioNumero;
            const posicion = nuevaLetra + nuevoNumero;
            if (esPosicionValida(nuevaLetra, nuevoNumero)) {
                !mapPosPiezas[posicion]
                    ? posiblesMovs.push(posicion)
                    : pieza === "n"
                      ? !esBlanco(mapPosPiezas[posicion]) && posiblesCapturas.push(posicion)
                      : esBlanco(mapPosPiezas[posicion]) && posiblesCapturas.push(posicion);
            }
        });
    } else if (pieza === "r" || pieza === "R") {
        //Torres
        const { movimientos, capturas } = movimientosTorre(letraCode, numero, mapPosPiezas, pieza);

        posiblesCapturas = capturas;

        posiblesMovs = movimientos;
    } else if (pieza === "x" || pieza === "X") {
        //Alfiles
        const { movimientos, capturas } = movimientosAlfil(letraCode, numero, mapPosPiezas, pieza);

        posiblesCapturas = capturas;

        posiblesMovs = movimientos;
    } else if (pieza === "q" || pieza === "Q") {
        //Damas
        const { movimientos: movimientosT, capturas: capturasTorre } = movimientosTorre(letraCode, numero, mapPosPiezas, pieza);
        const { movimientos: movimientosA, capturas: capturasAlfil } = movimientosAlfil(letraCode, numero, mapPosPiezas, pieza);
        posiblesMovs = movimientosT;
        const aux = movimientosA;
        posiblesMovs = posiblesMovs.concat(aux);
        posiblesCapturas = capturasTorre;
        const capAux = capturasAlfil;
        posiblesCapturas = posiblesCapturas.concat(capAux);
    } else if (pieza === "k" || pieza === "K") {
        //Reyes
        const { movimientos, capturas } = movimientoRey(letraCode, numero, mapPosPiezas, pieza, primerMRB, primerMRN);
        posiblesCapturas = capturas;
        posiblesMovs = movimientos;
    }
    if (orden === "movs") {
        return posiblesMovs;
    } else {
        return posiblesCapturas;
    }
}
export function mostrarPath(cord, mapPosPiezas, setPosibles, setCapturas, primerMRB, primerMRN, jaque) {
    let posiblesMovs;
    let posiblesCapturas;
    if (jaque.piezas) {
        //Si hay jaques no se puede enrocar
        posiblesMovs = movsLegales("movs", jaque, cord, mapPosPiezas, false, false);
        posiblesCapturas = movsLegales("captura", jaque, cord, mapPosPiezas, false, false);
    } else {
        posiblesMovs = movsLegales("movs", jaque, cord, mapPosPiezas, primerMRB, primerMRN);
        posiblesCapturas = movsLegales("captura", jaque, cord, mapPosPiezas, primerMRB, primerMRN);
    }
    piezaSeleccionada = cord;
    setPosibles(posiblesMovs);
    setCapturas(posiblesCapturas);
}
