document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр 'temporada' из URL
    const params = new URLSearchParams(window.location.search);
    const temporada = params.get('Jornadas');
  
    // Загружаем XML и обновляем данные для выбранного сезона
    fetch('/XMLyXSD/XMLJornadas.xml')
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  
        // Вызываем функцию для обновления информации о туре
        updateJornadaInfo(xmlDoc, temporada);
      });
});

function updateJornadaInfo(xmlDoc, temporada) {
    console.log(temporada);
    const jornadaElement = xmlDoc.querySelector(`Temporada${temporada}`);
    console.log(jornadaElement);

    if (jornadaElement) {
        const jornadaEspecificaElement = jornadaElement.querySelector(`Jornada1`);
        const partidos = jornadaEspecificaElement.querySelectorAll('Partido');
        console.log(jornadaEspecificaElement);

        partidos.forEach((partido, index) => {
            const fotcaLocalElement = partido.querySelector('FotcaLocal');
            const fotcaVisitanteElement = partido.querySelector('FotcaVisitante');
            const nomEquipoLocalElement = partido.querySelector('NomEquipoLocal');
            const nombreEquipoVisitanteElement = partido.querySelector('NombreEquipoVisitante');
            const etiquetaPartidoElement = partido.querySelector('EtiquetaPartido');
            const resultadoLocalElement = partido.querySelector('ResultadoLocal');
            const resultadoVisitanteElement = partido.querySelector('ResultadoVIsitante');

            const fotcaLocal = document.getElementById(`fotcaLocal${index + 1}`);
            const fotcaVisitante = document.getElementById(`fotcaVisitante${index + 1}`);
            const nomEquipoLocal = document.getElementById(`nomEquipoLocal${index + 1}`);
            const nombreEquipoVisitante = document.getElementById(`nombreEquipoVisitante${index + 1}`);
            const etiquetaPartido = document.getElementById(`etiquetaPartido${index + 1}`);
            const resultadoLocal = document.getElementById(`resultadoLocal${index + 1}`);
            const resultadoVisitante = document.getElementById(`resultadoVisitante${index + 1}`);

            if (fotcaLocal && fotcaVisitante && nomEquipoLocal && nombreEquipoVisitante && etiquetaPartido && resultadoLocal && resultadoVisitante) {
                fotcaLocal.src = fotcaLocalElement.textContent;
                fotcaVisitante.src = fotcaVisitanteElement.textContent;
                nomEquipoLocal.textContent = nomEquipoLocalElement.textContent;
                nombreEquipoVisitante.textContent = nombreEquipoVisitanteElement.textContent;
                etiquetaPartido.textContent = etiquetaPartidoElement.textContent;
                resultadoLocal.textContent = resultadoLocalElement.textContent;
                resultadoVisitante.textContent = resultadoVisitanteElement.textContent;
            }
        });
    } else {
        console.log("dinahu");
    }
}
