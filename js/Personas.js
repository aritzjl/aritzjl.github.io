document.addEventListener('DOMContentLoaded', function () {
  // Получаем параметр 'club' из URL
  const params = new URLSearchParams(window.location.search);
  const clubId = params.get('club');

  // Загружаем XML и обновляем данные для выбранной команды
  fetch('/XMLyXSD/XMLPersonas.xml')
    .then(response => response.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

      // Вызываем функцию обновления информации о клубе
      updatePlayerInfo(xmlDoc, clubId);
    });
});

function updatePlayerInfo(xmlDoc, clubId) {
  const clubElement = xmlDoc.querySelector(clubId);
  if (clubElement) {
    for (let i = 1; i <= 13; i++) {
      const personaElement = xmlDoc.querySelector(`${clubId} > jugador${i}`);

      const FotcaElement = personaElement.querySelector('Fotca');
      const NameElement = personaElement.querySelector('Name');
      const AnosElement = personaElement.querySelector('Anos');
      const AltElement = personaElement.querySelector('Alt');
      const PesoElement = personaElement.querySelector('Peso');

      const Fotca = document.getElementById(`Fotca${i}`);
      const Name = document.getElementById(`Name${i}`);
      const Anos = document.getElementById(`Anos${i}`);
      const Alt = document.getElementById(`Alt${i}`);
      const Peso = document.getElementById(`Peso${i}`);

      Fotca.src = FotcaElement.textContent;
      Name.textContent = NameElement.textContent;
      Anos.textContent = AnosElement.textContent;
      Alt.textContent = AltElement.textContent;
      Peso.textContent = PesoElement.textContent;
    }
  }
}
