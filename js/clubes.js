document.addEventListener('DOMContentLoaded', function () {
    // Load XML
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Update the table
            updateTable(xmlDoc);
        });
});

function updateTable(xmlDoc) {
    const nombreElement = xmlDoc.querySelector('club1 > nombre');
    const estadioElement = xmlDoc.querySelector('club1 > estadio');
    const presidenteElement = xmlDoc.querySelector('club1 > presidente');
    const fundacionElement = xmlDoc.querySelector('club1 > fundacion');
    const ciudadElement = xmlDoc.querySelector('club1 > ciudad');

    // Заменяем информацию
    const nombre = document.getElementById('nombre');
    const estadio = document.getElementById('estadio');
    const presidente = document.getElementById('presidente');
    const fundacion = document.getElementById('fundacion');
    const ciudad = document.getElementById('ciudad');

    // Update table elements with information from XML
    nombre.textContent = nombreElement.textContent;
    estadio.textContent = estadioElement.textContent;
    presidente.textContent = presidenteElement.textContent;
    fundacion.textContent = fundacionElement.textContent;
    ciudad.textContent = ciudadElement.textContent;
}
