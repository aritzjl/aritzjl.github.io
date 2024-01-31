// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el parámetro 'club' de la URL
    const params = new URLSearchParams(window.location.search);
    const clubId = params.get('club');

    // Carga el archivo XML y actualiza los datos para el club seleccionado
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Llama a la función para actualizar la información del club
            updateClubInfo(xmlDoc, clubId);
        });
});

// Función para actualizar la información del club en la página
function updateClubInfo(xmlDoc, clubId) {
    // Obtiene los elementos para el club seleccionado
    const clubElement = xmlDoc.querySelector(clubId);

    if (clubElement) { // Verifica que el club exista
        // Obtiene los elementos de información del club
        const escudoElement = clubElement.querySelector('escudo');
        const codigoElement = clubElement.querySelector('codigo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const cantidadElement = clubElement.querySelector('cantidad');
        const historiaElement = clubElement.querySelector('historia');

        // Actualiza la información en la página
        document.getElementById('escudo').src = escudoElement.textContent;
        document.getElementById('codigo').textContent = codigoElement.textContent;
        document.getElementById('nombre').textContent = nombreElement.textContent;
        document.getElementById('estadio').textContent = estadioElement.textContent;
        document.getElementById('presidente').textContent = presidenteElement.textContent;
        document.getElementById('cantidad').textContent = cantidadElement.textContent;
        document.getElementById('historia').textContent = historiaElement.textContent;
    } 
}
