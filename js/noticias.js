// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Carga el archivo XML y actualiza la tabla
    fetch('/XMLyXSD/XMLInfoNoticias.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Actualiza la tabla con los datos de las noticias
            updateTable(xmlDoc);
        })
        .catch(error => console.error('Error al obtener el XML:', error));
});

// Función para actualizar la tabla con datos de noticias desde el XML
function updateTable(xmlDoc) {
    // Itera sobre todas las noticias en el XML
    for (let i = 1; i <= 9; i++) {
        // Obtiene el elemento de la noticia del XML
        const NoticiaElement = xmlDoc.querySelector(`news[id="noticia${i}"]`);

        if (NoticiaElement) { // Verifica que el elemento exista
            // Obtiene los elementos necesarios de datos de la noticia
            const NameElement = NoticiaElement.querySelector('NameNoticias');
            const imageElement = NoticiaElement.querySelector('NoticiasFoto');
            const NewsLittleElement = NoticiaElement.querySelector('NewsLittle');

            // Obtiene los elementos HTML correspondientes en la página
            const image = document.getElementById(`NoticiasFoto${i}`);
            const nombre = document.getElementById(`NameNoticias${i}`);
            const NewsLittle = document.getElementById(`NewsLittle${i}`);

            // Actualiza el contenido de los elementos HTML con datos del XML
            if (imageElement) {
                image.src = imageElement.textContent;
            }

            if (NameElement) {
                nombre.textContent = NameElement.textContent;
            }

            if (NewsLittleElement) {
                NewsLittle.textContent = NewsLittleElement.textContent;
            }
        }

        // Añade manejo para elementos con id que comienzan con "noticiaFast"
        const NoticiaFastElement = xmlDoc.querySelector(`news[id^="noticiaFast${i}"]`);

        if (NoticiaFastElement) { // Verifica que el elemento exista
            // Obtiene los elementos necesarios de datos de la noticia rápida
            const NameFNotElement = NoticiaFastElement.querySelector('NameFNot');
            const imageFElement = NoticiaFastElement.querySelector('image');
            const NewsFLitElement = NoticiaFastElement.querySelector('NewsFLit');

            // Obtiene los elementos HTML correspondientes en la página
            const imageF = document.getElementById(`image${i}`);
            const nombreF = document.getElementById(`NameFNot${i}`);
            const NewsFLit = document.getElementById(`NewsFLit${i}`);

            // Actualiza el contenido de los elementos HTML con datos del XML
            if (imageFElement) {
                imageF.src = imageFElement.textContent;
            }

            if (NameFNotElement) {
                nombreF.textContent = NameFNotElement.textContent;
            }

            if (NewsFLitElement) {
                NewsFLit.textContent = NewsFLitElement.textContent;
            }
        }
    }
}

// Función para navegar a la página de noticias con la URL de la noticia
function navigateToNoticiasPage(NoticiaUrl) {
    window.location.href = NoticiaUrl;
}
