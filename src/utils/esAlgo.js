import { movsLegales } from "./utils";
import { posiblesJugadas } from "./mov";
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
function esJaque(posicion, mapPiezas, turno, setJaque) {
    //"K"-> oponente=Negras, "k"-> oponente=Blancas
    const oponente = turno ? "K" : "k";
    const reyOponente = Object.keys(mapPiezas).find((cord) => mapPiezas[cord] === oponente);
    const posiblesCapturas = posiblesJugadas("captura", posicion, mapPiezas);
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
    } else {
        return false;
    }
}

function esPeon(pieza) {
    const piezaCode = pieza.charCodeAt(0);
    if ((piezaCode <= "h".charCodeAt(0) && piezaCode >= "a".charCodeAt(0)) || pieza == "O") {
        return false;
    } else {
        return pieza;
    }
}
function esJaqueMate(jaque, mapPosPiezas, setMate) {
    const turno = jaque.piezas === "blancas";
    const piezas = [];
    if (turno) {
        Object.entries(mapPosPiezas).forEach(([key, value]) => {
            if (value !== "") {
                if (esBlanco(value)) {
                    piezas.push(key);
                }
            }
        });
    } else {
        Object.entries(mapPosPiezas).forEach(([key, value]) => {
            if (value !== "") {
                if (!esBlanco(value)) {
                    piezas.push(key);
                }
            }
        });
    }
    const movimientos = [];
    piezas.forEach((cord) => {
        const mov = movsLegales("movs", jaque, cord, mapPosPiezas, false, false);
        if (mov.length !== 0) {
            movimientos.push(mov);
        }
        const captura = movsLegales("captura", jaque, cord, mapPosPiezas, false, false);
        if (captura.length !== 0) {
            movimientos.push(captura);
        }
    });
    if (movimientos.length === 0) {
        setMate(true);
        return true;
    } else {
        return false;
    }
}

function esBlanco(pieza) {
    const letra = pieza.split("")[0];
    if (letra === "p" || letra === "n" || letra === "r" || letra === "q" || letra === "k" || letra === "x") {
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
export { esAhogado, esBlanco, esCoronacion, esPosicionValida, esJaque, esJaqueMate, esPeon, esMiTurno, esCapturaAlPasoValida };
