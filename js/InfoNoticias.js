// Cuando el DOM está completamente cargado, ejecutar estas acciones
document.addEventListener('DOMContentLoaded', function () {
    // Obtener parámetros 'noticia' de la URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');
    const noticiaFastId = params.get('noticiaFast');

    // Cargar el archivo XML y actualizar los datos para la noticia seleccionada
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Llamar a la función para actualizar la información de la noticia
            updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId);
        });
});

// Función para actualizar la información de la noticia en la página
function updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId) {
    if (noticiaFastId) {
        // Si existe el id noticiaFastId
        const noticiaFastElement = xmlDoc.querySelector(`news[id="${noticiaFastId}"]`);
        if (noticiaFastElement) {
            // Obtener elementos de la noticia rápida desde XML
            const imageFElement = noticiaFastElement.querySelector('image');
            const NameFNotElement = noticiaFastElement.querySelector('NameFNot');
            const NewsFPrimeroTElement = noticiaFastElement.querySelector('NewsFPrimeroT');
            const NewsFSegundoTElement = noticiaFastElement.querySelector('NewsFSegundoT');
            const NewsFTerseroTElement = noticiaFastElement.querySelector('NewsFTersero');
            const NewsFCuartoTElement = noticiaFastElement.querySelector('NewsFCuartoT');

            // Verificar que los elementos existen antes de actualizar HTML
            if (imageFElement && NameFNotElement && NewsFPrimeroTElement && NewsFSegundoTElement && NewsFTerseroTElement && NewsFCuartoTElement) {
                // Actualizar elementos HTML con datos de noticia rápida
                document.getElementById('NoticiasFoto').src = imageFElement.textContent;
                document.getElementById('NoticiasTitle').textContent = NameFNotElement.textContent;
                document.getElementById('PrimeroText').textContent = NewsFPrimeroTElement.textContent;
                document.getElementById('SegundoText').textContent = NewsFSegundoTElement.textContent;
                document.getElementById('TerseroText').textContent = NewsFTerseroTElement.textContent;
                document.getElementById('CuartoText').textContent = NewsFCuartoTElement.textContent;
            }
        }
    } else {
        // Obtener elemento de noticia desde XML con el id proporcionado
        const noticiaElement = xmlDoc.querySelector(`news[id="${noticiaId}"]`);

        if (noticiaElement) {
            // Obtener elementos de la noticia desde XML
            const newsImageElement = noticiaElement.querySelector('NoticiasFoto');
            const newsTitleElement = noticiaElement.querySelector('NoticiasTitle');
            const newsPrimeroTextElement = noticiaElement.querySelector('PrimeroText');
            const newsSegundoTextElement = noticiaElement.querySelector('SegundoText');
            const newsTerseroTextElement = noticiaElement.querySelector('TerseroText');
            const newsCuartoTextElement = noticiaElement.querySelector('CuartoText');

            // Verificar que los elementos existen antes de actualizar HTML
            if (newsImageElement && newsTitleElement && newsPrimeroTextElement && newsSegundoTextElement && newsTerseroTextElement && newsCuartoTextElement) {
                // Actualizar elementos HTML con datos de la noticia
                document.getElementById('NoticiasFoto').src = newsImageElement.textContent;
                document.getElementById('NoticiasTitle').textContent = newsTitleElement.textContent;
                document.getElementById('PrimeroText').textContent = newsPrimeroTextElement.textContent;
                document.getElementById('SegundoText').textContent = newsSegundoTextElement.textContent;
                document.getElementById('TerseroText').textContent = newsTerseroTextElement.textContent;
                document.getElementById('CuartoText').textContent = newsCuartoTextElement.textContent;
            }
        }
    }
}
