import { hayPiezasEntreMedio } from "./utils";
import { esPosicionValida } from "./esAlgo";
function hacerEnroque(letraTorre, letra, numero, torre, mapPosPiezas, movimientos) {
    const posInicial = letraTorre == "r" ? "e1" : "e8";
    !hayPiezasEntreMedio(posInicial, torre, mapPosPiezas, "k") &&
        esPosicionValida(letra, numero) &&
        mapPosPiezas[torre] === letraTorre &&
        movimientos.push(letra + numero);
}
export { hacerEnroque };
