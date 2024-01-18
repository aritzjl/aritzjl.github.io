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
    for (let i = 1; i <= 6; i++) {
        const clubElement = xmlDoc.querySelector(`club${i}`);
        const escudoElement = clubElement.querySelector('escudo');
        const nombreElement = clubElement.querySelector('nombre');
        const estadioElement = clubElement.querySelector('estadio');
        const presidenteElement = clubElement.querySelector('presidente');
        const fundacionElement = clubElement.querySelector('fundacion');
        const ciudadElement = clubElement.querySelector('ciudad');

        const image = document.getElementById(`image${i}`);
        const nombre = document.getElementById(`nombre${i}`);
        const estadio = document.getElementById(`estadio${i}`);
        const presidente = document.getElementById(`presidente${i}`);
        const fundacion = document.getElementById(`fundacion${i}`);
        const ciudad = document.getElementById(`ciudad${i}`);

        image.src = escudoElement.textContent;
        nombre.textContent = nombreElement.textContent;
        estadio.textContent = estadioElement.textContent;
        presidente.textContent = presidenteElement.textContent;
        fundacion.textContent = fundacionElement.textContent;
        ciudad.textContent = ciudadElement.textContent;
    }
}

function navigateToClubPage(url) {
    window.location.href = url;
}