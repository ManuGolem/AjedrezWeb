// Funciones relacionadas al jaque
import { esBlanco } from "./esAlgo";
import { buscarPosiblesJugadas } from "./hacer";
import { movsLegales } from "./mov";
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
    const piezas = turno ? piezasBlancas : piezasNegras;
    piezas.forEach((cord) => {
        if (esJaque(cord, mapPosPiezas, turno, setJaque) && !hayProblema) {
            hayProblema = true;
        }
    });
    return hayProblema;
}
function esJaque(posicion, mapPiezas, turno, setJaque) {
    //"K"-> oponente=Negras, "k"-> oponente=Blancas
    const oponente = turno ? "K" : "k";
    const reyOponente = Object.keys(mapPiezas).find((cord) => mapPiezas[cord] === oponente);
    const posiblesCapturas = buscarPosiblesJugadas("captura", posicion, mapPiezas);
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
export { hayJaque, esJaque, esJaqueMate };
