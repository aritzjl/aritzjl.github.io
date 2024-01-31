document.addEventListener('DOMContentLoaded', function () {
    // Obtener los parámetros 'Jornadas' y 'Year' de la URL
    const params = new URLSearchParams(window.location.search);

    const Jornada = params.get('Jornadas').replace('Jornadas', '');
    const Year = params.get('Year').replace('Year', '');

    // Cargar el archivo XML y actualizar los datos para la temporada seleccionada
    fetch('/XMLyXSD/XMLJornadas.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            // Llamar a la función para actualizar la información de la jornada y el año
            updateJornadaInfo(xmlDoc, Jornada, Year);
        });
});

// Función para actualizar la información de la jornada y el año en la página
function updateJornadaInfo(xmlDoc, Jornada, Year) {
    console.log(`Año: ${Year}`);
    console.log(`Jornada: ${Jornada}`);

    // Obtener el elemento del año del XML según el año proporcionado
    const YearElement = xmlDoc.querySelector(`Temporada${Year}`);
    if (YearElement) {
        // Obtener el elemento de la jornada dentro del año según la jornada proporcionada
        const jornadaElement = YearElement.querySelector(`Jornada${Jornada}`);
        console.log(jornadaElement);
        if (jornadaElement) {
            // Iterar sobre los partidos de la jornada
            for (let i = 1; i <= 3; i++) {
                // Obtener el elemento del partido según el número proporcionado
                const partido = jornadaElement.querySelector(`Partido${i}`);
                console.log(partido);
                if (partido) {
                    // Obtener elementos del partido del XML
                    const fotcaLocalElement = partido.querySelector('fotcaLocal');
                    const fotcaVisitanteElement = partido.querySelector('fotcaVisitante');
                    const nomEquipoLocalElement = partido.querySelector('nomEquipoLocal');
                    const nombreEquipoVisitanteElement = partido.querySelector('nombreEquipoVisitante');
                    const etiquetaPartidoElement = partido.querySelector('etiquetaPartido');
                    const resultadoLocalElement = partido.querySelector('resultadoLocal');
                    const resultadoVisitanteElement = partido.querySelector('resultadoVisitante');

                    // Obtener elementos HTML correspondientes en la página
                    const fotcaLocal = document.getElementById(`fotcaLocal${i}`);
                    const fotcaVisitante = document.getElementById(`fotcaVisitante${i}`);
                    const nomEquipoLocal = document.getElementById(`nomEquipoLocal${i}`);
                    const nombreEquipoVisitante = document.getElementById(`nombreEquipoVisitante${i}`);
                    const etiquetaPartido = document.getElementById(`etiquetaPartido${i}`);
                    const resultadoLocal = document.getElementById(`resultadoLocal${i}`);
                    const resultadoVisitante = document.getElementById(`resultadoVisitante${i}`);

                    // Actualizar elementos HTML con datos del partido
                    if (fotcaLocal && fotcaVisitante && nomEquipoLocal && nombreEquipoVisitante && etiquetaPartido && resultadoLocal && resultadoVisitante) {
                        fotcaLocal.src = fotcaLocalElement.textContent;
                        fotcaVisitante.src = fotcaVisitanteElement.textContent;
                        nomEquipoLocal.textContent = nomEquipoLocalElement.textContent;
                        nombreEquipoVisitante.textContent = nombreEquipoVisitanteElement.textContent;
                        etiquetaPartido.textContent = etiquetaPartidoElement.textContent;
                        resultadoLocal.textContent = resultadoLocalElement.textContent;
                        resultadoVisitante.textContent = resultadoVisitanteElement.textContent;
                    }
                } else {
                    console.log(`Número de partido incorrecto: ${i}`);
                }
            }
        } else {
            console.log("Número de jornada incorrecto");
        }
    } else {
        console.log("Número de temporada incorrecto");
    }
}
