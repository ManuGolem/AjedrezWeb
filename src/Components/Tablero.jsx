export function Tablero() {
    const tablero = Array.from({ length: 64 }, (_, i) => {
        const fila = Math.floor(i / 8); // determina la fila
        return (i % 2 === 0) === (fila % 2 === 0); // alterna cada 8 elementos
    });
    const tableroM2=[[8,7,6,5,4,3,2,1],["a","b","c","d","e","f","g","h"]]
    let tableroM3=Array(8).fill(null).map(() => Array(8).fill(""));
    tableroM2[0].forEach((columna,indexcol) => {
        tableroM2[1].forEach((fila,indexfila) =>{
            tableroM3[indexcol][indexfila]=`${fila}${columna}`;
        })
    })
    const start={
        "a1":"./icons/rook.svg",
        "a2":"./icons/pawn.svg",
        "a3":"",
        "a4":"",
        "a5":"",
        "a6":"",
        "a7":"./icons/pawn.svg",
        "a8":"./icons/rook.svg",
    }
    return (
        <article className="tablero">
            {tablero.map((fila, index) => (
                <div key={index} className={fila ? "blanca" : "negra"}>{index}</div>
            ))}
        </article>
    );
}
