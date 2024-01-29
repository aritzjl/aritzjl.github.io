document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'temporada' de la URL
    const params = new URLSearchParams(window.location.search);
    const temporada = params.get('temporada');
  
    // Cargar XML y actualizar datos para la temporada seleccionada
    fetch('/ruta/a/tu/XML.xml')
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  
        // Llamar a la función para actualizar la información de la temporada
        updateJornadaInfo(xmlDoc, temporada);
      });
  });
  
  function updateJornadaInfo(xmlDoc, temporada) {
    const jornadaElement = xmlDoc.querySelector(`${temporada} > Jornada1`);
    if (jornadaElement) {
      const partidos = jornadaElement.querySelectorAll('Partido');
  
      partidos.forEach((partido, index) => {
        const fotcaLocalElement = partido.querySelector('FotcaLocal');
        const fotcaVisitanteElement = partido.querySelector('FotcaVisitante');
        const nomEquipoLocalElement = partido.querySelector('NomEquipoLocal');
        const nombreEquipoVisitanteElement = partido.querySelector('NombreEquipoVisitante');
        const etiquetaPartidoElement = partido.querySelector('EtiquetaPartido');
        const resultadoLocalElement = partido.querySelector('ResultadoLocal');
        const resultadoVisitanteElement = partido.querySelector('ResultadoVIsitante');
  
        const fotcaLocal = document.getElementById(`FotcaLocal${index + 1}`);
        const fotcaVisitante = document.getElementById(`FotcaVisitante${index + 1}`);
        const nomEquipoLocal = document.getElementById(`NomEquipoLocal${index + 1}`);
        const nombreEquipoVisitante = document.getElementById(`NombreEquipoVisitante${index + 1}`);
        const etiquetaPartido = document.getElementById(`EtiquetaPartido${index + 1}`);
        const resultadoLocal = document.getElementById(`ResultadoLocal${index + 1}`);
        const resultadoVisitante = document.getElementById(`ResultadoVIsitante${index + 1}`);
  
        fotcaLocal.src = fotcaLocalElement.textContent;
        fotcaVisitante.src = fotcaVisitanteElement.textContent;
        nomEquipoLocal.textContent = nomEquipoLocalElement.textContent;
        nombreEquipoVisitante.textContent = nombreEquipoVisitanteElement.textContent;
        etiquetaPartido.textContent = etiquetaPartidoElement.textContent;
        resultadoLocal.textContent = resultadoLocalElement.textContent;
        resultadoVisitante.textContent = resultadoVisitanteElement.textContent;
      });
    }
  }