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
    const club = xmlDoc.querySelector('club');
    const escudoElement = club.querySelector('escudo');
    const nombreElement = club.querySelector('nombre');
    const estadioElement = club.querySelector('estadio');
    const presidenteElement = club.querySelector('presidente');
    const fundacionElement = club.querySelector('fundacion');
    const ciudadElement = club.querySelector('ciudad');

    const club2 = xmlDoc.querySelector('club2');
    const escudoElement2 = club2.querySelector('escudo');
    const nombreElement2 = club2.querySelector('nombre');
    const estadioElement2 = club2.querySelector('estadio');
    const presidenteElement2 = club2.querySelector('presidente');
    const fundacionElement2 = club2.querySelector('fundacion');
    const ciudadElement2 = club2.querySelector('ciudad');

    const club3 = xmlDoc.querySelector('club3');
    const escudoElement3 = club3.querySelector('escudo3');
    const nombreElement3 = club3.querySelector('nombre3');
    const estadioElement3 = club3.querySelector('estadio3');
    const presidenteElement3 = club3.querySelector('presidente3');
    const fundacionElement3 = club3.querySelector('fundacion3');
    const ciudadElement3 = club3.querySelector('ciudad3');

    const club4 = xmlDoc.querySelector('club4');
    const escudoElement4 = club4.querySelector('escudo4');
    const nombreElement4 = club4.querySelector('nombre4');
    const estadioElement4 = club4.querySelector('estadio4');
    const presidenteElement4 = club4.querySelector('presidente4');
    const fundacionElement4 = club4.querySelector('fundacion4');
    const ciudadElement4 = club4.querySelector('ciudad4');

    const club5 = xmlDoc.querySelector('club5');
    const escudoElement5 = club5.querySelector('escudo5');
    const nombreElement5 = club5.querySelector('nombre5');
    const estadioElement5 = club5.querySelector('estadio5');
    const presidenteElement5 = club5.querySelector('presidente5');
    const fundacionElement5 = club5.querySelector('fundacion5');
    const ciudadElement5 = club5.querySelector('ciudad5');

    const club6 = xmlDoc.querySelector('club6');
    const escudoElement6 = club6.querySelector('escudo6');
    const nombreElement6 = club6.querySelector('nombre6');
    const estadioElement6 = club6.querySelector('estadio6');
    const presidenteElement6 = club6.querySelector('presidente6');
    const fundacionElement6 = club6.querySelector('fundacion6');
    const ciudadElement6 = club6.querySelector('ciudad6');



    const image = document.getElementById('image');
    const nombre = document.getElementById('nombre');
    const estadio = document.getElementById('estadio');
    const presidente = document.getElementById('presidente');
    const fundacion = document.getElementById('fundacion');
    const ciudad = document.getElementById('ciudad');

    const image2 = document.getElementById('image');
    const nombre2 = document.getElementById('nombre');
    const estadio2 = document.getElementById('estadio');
    const presidente2 = document.getElementById('presidente');
    const fundacion2 = document.getElementById('fundacion');
    const ciudad2 = document.getElementById('ciudad');

    const image3 = document.getElementById('image3');
    const nombre3 = document.getElementById('nombre3');
    const estadio3 = document.getElementById('estadio3');
    const presidente3 = document.getElementById('presidente3');
    const fundacion3 = document.getElementById('fundacion3');
    const ciudad3 = document.getElementById('ciudad3');

    const image4 = document.getElementById('image4');
    const nombre4 = document.getElementById('nombre4');
    const estadio4 = document.getElementById('estadio4');
    const presidente4 = document.getElementById('presidente4');
    const fundacion4 = document.getElementById('fundacion4');
    const ciudad4 = document.getElementById('ciudad4');

    const image5 = document.getElementById('image5');
    const nombre5 = document.getElementById('nombre5');
    const estadio5 = document.getElementById('estadio5');
    const presidente5 = document.getElementById('presidente5');
    const fundacion5 = document.getElementById('fundacion5');
    const ciudad5 = document.getElementById('ciudad5');

    const image6 = document.getElementById('image6');
    const nombre6 = document.getElementById('nombre6');
    const estadio6 = document.getElementById('estadio6');
    const presidente6 = document.getElementById('presidente6');
    const fundacion6 = document.getElementById('fundacion6');
    const ciudad6 = document.getElementById('ciudad6');



    image.src = escudoElement.textContent;
    nombre.textContent = nombreElement.textContent;
    estadio.textContent = estadioElement.textContent;
    presidente.textContent = presidenteElement.textContent;
    fundacion.textContent = fundacionElement.textContent;
    ciudad.textContent = ciudadElement.textContent;

    image2.src = escudoElement2.textContent;
    nombre2.textContent = nombreElement2.textContent;
    estadio2.textContent = estadioElement2.textContent;
    presidente2.textContent = presidenteElement2.textContent;
    fundacion2.textContent = fundacionElement2.textContent;
    ciudad2.textContent = ciudadElement2.textContent;
    
    image3.src = escudoElement3.textContent;
    nombre3.textContent = nombreElement3.textContent;
    estadio3.textContent = estadioElement3.textContent;
    presidente3.textContent = presidenteElement3.textContent;
    fundacion3.textContent = fundacionElement3.textContent;
    ciudad3.textContent = ciudadElement3.textContent;

    image4.src = escudoElement4.textContent;
    nombre4.textContent = nombreElement4.textContent;
    estadio4.textContent = estadioElement4.textContent;
    presidente4.textContent = presidenteElement4.textContent;
    fundacion4.textContent = fundacionElement4.textContent;
    ciudad4.textContent = ciudadElement4.textContent;

    image5.src = escudoElement5.textContent;
    nombre5.textContent = nombreElement5.textContent;
    estadio5.textContent = estadioElement5.textContent;
    presidente5.textContent = presidenteElement5.textContent;
    fundacion5.textContent = fundacionElement5.textContent;
    ciudad5.textContent = ciudadElement5.textContent;

    image6.src = escudoElement6.textContent;
    nombre6.textContent = nombreElement6.textContent;
    estadio6.textContent = estadioElement6.textContent;
    presidente6.textContent = presidenteElement6.textContent;
    fundacion6.textContent = fundacionElement6.textContent;
    ciudad6.textContent = ciudadElement6.textContent;
}
function navigateToClubPage(url) {
    window.location.href = url;
}