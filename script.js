function mostrarEditor(tipo) {
    document.querySelectorAll('.editor').forEach(editor => editor.style.display = 'none');
    document.getElementById(`editor-${tipo}`).style.display = 'flex';
}

function transcribir(tipo) {
    const borrador = document.getElementById(`borrador-${tipo}`);
    const codigo = document.getElementById(`codigo-${tipo}`);
    const contenido = borrador.value;
    codigo.value = "";
    let i = 0;

    function escribir() {
        if (i < contenido.length) {
            codigo.value += contenido[i];
            i++;
            codigo.scrollTop = codigo.scrollHeight;

            if (contenido[i - 1] === '\n' || i === contenido.length) {
                actualizarVistaPrevia();
            }

            setTimeout(escribir, 30);
        }
    }

    escribir();
}

function actualizarVistaPrevia() {
    const html = document.getElementById("codigo-html").value;
    const css = document.getElementById("codigo-css").value;
    const js = document.getElementById("codigo-js").value;
    const output = document.getElementById("output");
    const doc = output.contentDocument || output.contentWindow.document;

    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { background: white; color: black; }
                ${css}
            </style>
        </head>
        <body>
            ${html}
            <script>
                ${js}
            <\/script>
        </body>
        </html>
    `);
    doc.close();
}

window.onload = () => mostrarEditor('html');