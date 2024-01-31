// Cuando el DOM esté completamente cargado, realizamos las siguientes acciones
document.addEventListener('DOMContentLoaded', function () {
    // Cargamos el archivo XML y actualizamos la tabla
    fetch('/XMLyXSD/XMLClubes.xml')
        .then(response => response.text())
        .then(xmlString => {
            // Creamos un parser para convertir el string XML en un documento XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Actualizamos la tabla con los datos de los clubes
            updateTable(xmlDoc);
        });
});

// Función para actualizar la tabla con los datos de los clubes
function updateTable(xmlDoc) {
    // Recorremos todos los clubes (en este caso, del 1 al 6)
    for (let i = 1; i <= 6; i++) {
        // Obtenemos el elemento del club desde el XML
        const clubElement = xmlDoc.querySelector(`club${i}`);
        
        // Obtenemos los elementos necesarios de datos del club
        const escudoElement = clubElement.querySelector('escudo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const cantidadSociosElement = clubElement.querySelector('cantidadSocios');
        const ciudadElement = clubElement.querySelector('ciudad');

        // Obtenemos los elementos HTML correspondientes en la página
        const image = document.getElementById(`image${i}`);
        const nombre = document.getElementById(`nombre${i}`);
        const estadio = document.getElementById(`estadio${i}`);
        const presidente = document.getElementById(`presidente${i}`);
        const cantidadSocios = document.getElementById(`cantidadSocios${i}`);
        const ciudad = document.getElementById(`ciudad${i}`);

        // Actualizamos el contenido de los elementos HTML con los datos del XML
        image.src = escudoElement.textContent;
        nombre.textContent = nombreElement.textContent;
        estadio.textContent = estadioElement.textContent;
        presidente.textContent = presidenteElement.textContent;
        cantidadSocios.textContent = cantidadSociosElement.textContent;
        ciudad.textContent = ciudadElement.textContent;
    }
}

// Función para navegar a la página del club
function navigateToClubPage(clubUrl) {
    // Cambiamos la ubicación de la ventana al URL del club
    window.location.href = clubUrl;
}
