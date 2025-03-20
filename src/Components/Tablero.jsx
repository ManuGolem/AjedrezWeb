export function Tablero() {
    const tablero = Array.from({ length: 64 }, (_, i) => {
        const fila = Math.floor(i / 8); // determina la fila
        return (i % 2 === 0) === (fila % 2 === 0); // alterna cada 8 elementos
    });

    return (
        <article className="tablero">
            {tablero.map((fila, index) => (
                <div key={index} className={fila ? "blanca" : "negra"} />
            ))}
        </article>
    );
}
