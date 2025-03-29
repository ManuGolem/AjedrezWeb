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

function esPosicionValida(letra, numero) {
    return numero >= 1 && numero <= 8 && letra >= "a" && letra <= "h";
}
export function mostrarPath(cord, mapPosPiezas, setPosibles) {
    const pieza = mapPosPiezas[cord];
    const cordenadas = cord.split("");
    const letra = cordenadas[0];
    const numero = Number(cordenadas[1]);
    const letraCode = letra.charCodeAt(0);
    const posiblesMovs = [];
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
    } else if (pieza === "c") {
        //Caballo blanco
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
    } else if (pieza === "C") {
        //Caballo negro
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
        //Torre blanca o torre negra
        for (let i = 1; i < 8; i++) {
            const nuevaLetraPositiva = String.fromCharCode(letraCode + i);
            const nuevaLetraNegativa = String.fromCharCode(letraCode - i);
            const nuevoNumeroPositivo = numero + i;
            const nuevoNumeroNegativo = numero - i;
            const posicionLetraPositiva = nuevaLetraPositiva + numero;
            const posicionLetraNegativa = nuevaLetraNegativa + numero;
            const posicionNumeroPositivo = letra + nuevoNumeroPositivo;
            const posicionNumeroNegativo = letra + nuevoNumeroNegativo;
            if (
                esPosicionValida(nuevaLetraPositiva, numero) &&
                !mapPosPiezas[posicionLetraPositiva]
            ) {
                posiblesMovs.push(posicionLetraPositiva);
            }
            if (
                esPosicionValida(nuevaLetraNegativa, numero) &&
                !mapPosPiezas[posicionLetraNegativa]
            ) {
                posiblesMovs.push(posicionLetraNegativa);
            }
            if (
                esPosicionValida(letra, nuevoNumeroPositivo) &&
                !mapPosPiezas[posicionNumeroPositivo]
            ) {
                posiblesMovs.push(posicionNumeroPositivo);
            }
            if (
                esPosicionValida(letra, nuevoNumeroNegativo) &&
                !mapPosPiezas[posicionNumeroNegativo]
            ) {
                posiblesMovs.push(posicionNumeroNegativo);
            }
        }
    } else if (pieza === "q") {
        //Dama blanca
    } else if (pieza === "Q") {
        //Dama negra
    }
    setPosibles(posiblesMovs);
}
