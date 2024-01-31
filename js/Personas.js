// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
  // Obtiene el parámetro 'club' de la URL
  const params = new URLSearchParams(window.location.search);
  const clubId = params.get('club');

  // Carga el archivo XML y actualiza los datos para el club seleccionado
  fetch('/XMLyXSD/XMLPersonas.xml')
    .then(response => response.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

      // Llama a la función para actualizar la información del jugador
      updatePlayerInfo(xmlDoc, clubId);
    });
});

// Función para actualizar la información del jugador en la página
function updatePlayerInfo(xmlDoc, clubId) {
  const clubElement = xmlDoc.querySelector(clubId);
  if (clubElement) {
    for (let i = 1; i <= 13; i++) {
      // Obtiene el elemento de la persona del XML
      const personaElement = xmlDoc.querySelector(`${clubId} > jugador${i}`);

      // Obtiene los elementos necesarios de datos del jugador
      const FotcaElement = personaElement.querySelector('Fotca');
      const NameElement = personaElement.querySelector('Name');
      const AnosElement = personaElement.querySelector('Anos');
      const AltElement = personaElement.querySelector('Alt');
      const PesoElement = personaElement.querySelector('Peso');
      const FichaElement = personaElement.querySelector('Ficha');

      // Obtiene los elementos HTML correspondientes en la página
      const Fotca = document.getElementById(`Fotca${i}`);
      const Name = document.getElementById(`Name${i}`);
      const Anos = document.getElementById(`Anos${i}`);
      const Alt = document.getElementById(`Alt${i}`);
      const Peso = document.getElementById(`Peso${i}`);
      const Ficha = document.getElementById(`Ficha${i}`);

      // Actualiza el contenido de los elementos HTML con datos del XML
      Fotca.src = FotcaElement.textContent;
      Name.textContent = NameElement.textContent;
      Anos.textContent = AnosElement.textContent;
      Alt.textContent = AltElement.textContent;
      Peso.textContent = PesoElement.textContent;
      Ficha.textContent = FichaElement.textContent;
    }
  }
}
