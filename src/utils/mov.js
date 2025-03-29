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
export function moverPieza(posicion, mapPosPiezas, setMapPiezas, setPosibles) {
    const piezaAMover = mapPosPiezas[piezaSeleccionada];
    const copiaMap = mapPosPiezas;
    copiaMap[piezaSeleccionada] = "";
    copiaMap[posicion] = piezaAMover;
    setMapPiezas(copiaMap);
    setPosibles();
}
function esPosicionValida(letra, numero) {
    return numero >= 1 && numero <= 8 && letra >= "a" && letra <= "h";
}
function movimientosTorre(letraCode, numero, mapPosPiezas) {
    const movimientos = [];
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
            if (mapPosPiezas[posicion]) break;

            movimientos.push(posicion);
        }
    });

    return movimientos;
}
function movimientoRey(letraCode, numero, mapPosPiezas) {
    const movimientos = [];

    // Todas las direcciones adyacentes
    for (let deltaLetra = -1; deltaLetra <= 1; deltaLetra++) {
        for (let deltaNumero = -1; deltaNumero <= 1; deltaNumero++) {
            if (deltaLetra === 0 && deltaNumero === 0) continue;

            const nuevaLetra = String.fromCharCode(letraCode + deltaLetra);
            const nuevoNumero = numero + deltaNumero;
            const posicion = nuevaLetra + nuevoNumero;

            if (
                esPosicionValida(nuevaLetra, nuevoNumero) &&
                !mapPosPiezas[posicion]
            ) {
                movimientos.push(posicion);
            }
        }
    }

    return movimientos;
}
function movimientosAlfil(letraCode, numero, mapPosPiezas) {
    const movimientos = [];
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
            if (mapPosPiezas[posicion]) break;

            movimientos.push(posicion);
        }
    });

    return movimientos;
}
export function mostrarPath(cord, mapPosPiezas, setPosibles) {
    const pieza = mapPosPiezas[cord];
    const cordenadas = cord.split("");
    const letra = cordenadas[0];
    const numero = Number(cordenadas[1]);
    const letraCode = letra.charCodeAt(0);
    let posiblesMovs = [];
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
    } else if (pieza === "c" || pieza === "C") {
        //Caballos
        MovsCaballo.forEach(([cambioLetra, cambioNumero]) => {
            const nuevaLetra = String.fromCharCode(letraCode + cambioLetra);
            const nuevoNumero = numero + cambioNumero;
            const posicion = nuevaLetra + nuevoNumero;
            if (
                !mapPosPiezas[posicion] &&
                esPosicionValida(nuevaLetra, nuevoNumero)
            ) {
                posiblesMovs.push(posicion);
            }
        });
    } else if (pieza === "r" || pieza === "R") {
        //Torres
        posiblesMovs = movimientosTorre(letraCode, numero, mapPosPiezas);
    } else if (pieza === "b" || pieza === "B") {
        //Alfiles
        posiblesMovs = movimientosAlfil(letraCode, numero, mapPosPiezas);
    } else if (pieza === "q" || pieza === "Q") {
        //Damas
        posiblesMovs = movimientosTorre(letraCode, numero, mapPosPiezas);
        const aux = movimientosAlfil(letraCode, numero, mapPosPiezas);
        posiblesMovs = posiblesMovs.concat(aux);
    } else if (pieza === "k" || pieza === "K") {
        //Reyes
        posiblesMovs = movimientoRey(letraCode, numero, mapPosPiezas);
    }
    piezaSeleccionada = cord;
    setPosibles(posiblesMovs);
}
