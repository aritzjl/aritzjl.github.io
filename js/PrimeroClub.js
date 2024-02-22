// Espera a que se cargue todo el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el parámetro 'clubInfo' de la URL
    const params = new URLSearchParams(window.location.search);
    const clubInfoJSON = params.get('clubInfo');

    // Convierte el JSON de 'clubInfo' en un objeto JavaScript
    const clubInfo = JSON.parse(decodeURIComponent(clubInfoJSON));

    // Muestra la información del club en el documento HTML
    document.getElementById('codEq').textContent = clubInfo.codEq;
    document.getElementById('nomEq').textContent = clubInfo.nomEq;
    document.getElementById('estadio').textContent = clubInfo.estadio;
    document.getElementById('presEq').textContent = clubInfo.presEq;
    document.getElementById('cantSocios').textContent = clubInfo.cantSocios;
});