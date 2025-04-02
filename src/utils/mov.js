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
let piezaSeleccionada;
function esBlanco(pieza) {
    const letra = pieza.split("")[0];
    if (letra === "p" || letra === "c" || letra === "r" || letra === "q" || letra === "k" || letra === "b") {
        return true;
    }
    return false;
}
export function esMiTurno(turno, pos, mapPosPiezas) {
    const devolver = turno ? esBlanco(mapPosPiezas[pos]) : !esBlanco(mapPosPiezas[pos]);
    return devolver;
}
export function capturarPieza(columna, mapPosPiezas, setMapPiezas, setPosibles, setCapturas, turno, setTurno, piezasCapturadas, setPiezasCapturadas) {
    //Parte para guardar las piezas que se van capturando
    const piezaACapturar = mapPosPiezas[columna];
    const copiaPiezas = piezasCapturadas;
    const colorPieza = esBlanco(piezaACapturar) ? "negras" : "blancas";
    copiaPiezas[colorPieza].push(piezaACapturar);
    setPiezasCapturadas(copiaPiezas);
    //Logica para mover la pieza
    const piezaAMover = mapPosPiezas[piezaSeleccionada];
    const copiaMap = mapPosPiezas;
    copiaMap[piezaSeleccionada] = "";
    copiaMap[columna] = piezaAMover;
    setMapPiezas(copiaMap);
    setTurno(!turno);
    setPosibles();
    setCapturas();
}
export function moverPieza(posicion, mapPosPiezas, setMapPiezas, setPosibles, setCapturas, turno, setTurno, setMRB, setMRN) {
    const piezaAMover = mapPosPiezas[piezaSeleccionada];
    const copiaMap = mapPosPiezas;
    if (piezaAMover === "k" || piezaAMover === "K") {
        const partes = posicion.split("");
        const numeroTorre = partes[1];
        const letra = String.fromCharCode(partes[0].charCodeAt(0));
        if (Math.abs(partes[0].charCodeAt(0) - piezaSeleccionada.split("")[0].charCodeAt(0)) > 1) {
            const torrePos = letra === "g" ? "h" : "a";
            const torreAMover = letra === "g" ? "f" : "d";
            const letraTorre = piezaAMover === "k" ? "r" : "R";
            piezaAMover === "k" && setMRB(false);
            piezaAMover === "K" && setMRN(false);
            copiaMap[piezaSeleccionada] = "";
            copiaMap[posicion] = piezaAMover;
            copiaMap[torrePos + numeroTorre] = "";
            copiaMap[torreAMover + numeroTorre] = letraTorre;
        } else {
            copiaMap[piezaSeleccionada] = "";
            copiaMap[posicion] = piezaAMover;
        }
    } else {
        copiaMap[piezaSeleccionada] = "";
        copiaMap[posicion] = piezaAMover;
    }
    setMapPiezas(copiaMap);
    setPosibles();
    setCapturas();
    setTurno(!turno);
}
function esPosicionValida(letra, numero) {
    return numero >= 1 && numero <= 8 && letra >= "a" && letra <= "h";
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

    // Todas las direcciones adyacentes
    for (let deltaLetra = -1; deltaLetra <= 1; deltaLetra++) {
        for (let deltaNumero = -1; deltaNumero <= 1; deltaNumero++) {
            if (deltaLetra === 0 && deltaNumero === 0) continue;

            const nuevaLetra = String.fromCharCode(letraCode + deltaLetra);
            const nuevoNumero = numero + deltaNumero;
            const posicion = nuevaLetra + nuevoNumero;

            if (esPosicionValida(nuevaLetra, nuevoNumero) && !mapPosPiezas[posicion]) {
                movimientos.push(posicion);
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
            esPosicionValida(letraCorto, numero) && mapPosPiezas[torreCorto] === "r" && movimientos.push(letraCorto + numero);
            esPosicionValida(letraLargo, numero) && mapPosPiezas[torreLargo] === "r" && movimientos.push(letraLargo + numero);
        }
    } else {
        //Rey negro
        if (primerMRN) {
            esPosicionValida(letraCorto, numero) && mapPosPiezas[torreCorto] === "R" && movimientos.push(letraCorto + numero);
            esPosicionValida(letraLargo, numero) && mapPosPiezas[torreLargo] === "R" && movimientos.push(letraLargo + numero);
        }
    }

    return movimientos;
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
            if (letra === "b" || letra === "q") {
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
export function mostrarPath(cord, mapPosPiezas, setPosibles, setCapturas, primerMRB, primerMRN) {
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
        const captura1 = String.fromCharCode(letraCode + 1) + (numero - 1);
        const captura2 = String.fromCharCode(letraCode - 1) + (numero - 1);
        mapPosPiezas[captura1] && esBlanco(mapPosPiezas[captura1]) && posiblesCapturas.push(captura1);
        mapPosPiezas[captura2] && esBlanco(mapPosPiezas[captura2]) && posiblesCapturas.push(captura2);
    } else if (pieza === "c" || pieza === "C") {
        //Caballos
        MovsCaballo.forEach(([cambioLetra, cambioNumero]) => {
            const nuevaLetra = String.fromCharCode(letraCode + cambioLetra);
            const nuevoNumero = numero + cambioNumero;
            const posicion = nuevaLetra + nuevoNumero;
            if (esPosicionValida(nuevaLetra, nuevoNumero)) {
                !mapPosPiezas[posicion]
                    ? posiblesMovs.push(posicion)
                    : pieza === "c"
                      ? !esBlanco(mapPosPiezas[posicion]) && posiblesCapturas.push(posicion)
                      : esBlanco(mapPosPiezas[posicion]) && posiblesCapturas.push(posicion);
            }
        });
    } else if (pieza === "r" || pieza === "R") {
        //Torres
        const { movimientos, capturas } = movimientosTorre(letraCode, numero, mapPosPiezas, pieza);
        posiblesCapturas = capturas;
        posiblesMovs = movimientos;
    } else if (pieza === "b" || pieza === "B") {
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
        posiblesMovs = movimientoRey(letraCode, numero, mapPosPiezas, pieza, primerMRB, primerMRN);
    }
    piezaSeleccionada = cord;
    setPosibles(posiblesMovs);
    setCapturas(posiblesCapturas);
}
