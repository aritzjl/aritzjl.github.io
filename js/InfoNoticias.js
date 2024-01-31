document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'noticia' de la URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('noticia');
    const noticiaFastId = params.get('noticiaFast');

    // Cargar el archivo XML y actualizar los datos para la noticia seleccionada
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Llamar a la función de actualización de información de la noticia
            updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId);
        });
});

// Función para actualizar la información de la noticia en la página
function updateNoticiaInfo(xmlDoc, noticiaId, noticiaFastId) {
    // Obtener el elemento de noticia del XML según el id proporcionado
    const noticiaElement = xmlDoc.querySelector(`news[id="${noticiaId}"]`);
    console.log(noticiaId);

    if (noticiaElement) {
        // Obtener elementos del área de noticia del XML
        const newsImageElement = noticiaElement.querySelector('NoticiasFoto');
        const newsTitleElement = noticiaElement.querySelector('NoticiasTitle');
        const newsPrimeroTextElement = noticiaElement.querySelector('PrimeroText');
        const newsSegundoTextElement = noticiaElement.querySelector('SegundoText');
        const newsTerseroTextElement = noticiaElement.querySelector('TerseroText');
        const newsCuartoTextElement = noticiaElement.querySelector('CuartoText');

        // Actualizar elementos HTML con datos de la noticia
        document.getElementById('NoticiasFoto').src = newsImageElement.textContent;
        document.getElementById('NoticiasTitle').textContent = newsTitleElement.textContent;
        document.getElementById('PrimeroText').textContent = newsPrimeroTextElement.textContent;
        document.getElementById('SegundoText').textContent = newsSegundoTextElement.textContent;
        document.getElementById('TerseroText').textContent = newsTerseroTextElement.textContent;
        document.getElementById('CuartoText').textContent = newsCuartoTextElement.textContent;
    } else {
        // Si es un elemento noticiaFast
        const noticiaFastElement = xmlDoc.querySelector(`news[id="${noticiaFastId}"]`);
        console.log(noticiaFastElement);

        if (noticiaFastElement) {
            // Obtener elementos del área noticiaFast del XML
            const imageFElement = noticiaFastElement.querySelector('NoticiasFoto');
            const NameFNotElement = noticiaFastElement.querySelector('NoticiasTitle');
            const NewsFLitElement = noticiaFastElement.querySelector('PrimeroText');

            // Actualizar elementos HTML con datos de noticiaFast
            document.getElementById('NoticiasFoto').src = imageFElement.textContent;
            document.getElementById('NoticiasTitle').textContent = NameFNotElement.textContent;
            document.getElementById('PrimeroText').textContent = NewsFLitElement.textContent;
        }
    }
}
