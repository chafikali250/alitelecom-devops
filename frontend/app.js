async function checkStatus() {
  const resultDiv = document.getElementById('status-result');
  resultDiv.innerText = "Connexion à l'API en cours...";
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    resultDiv.innerText = `Statut: ${data.status} | Serveur: ${data.hostname}`;
  } catch (err) {
    resultDiv.innerText = "Erreur de connexion à l'API backend.";
  }
}
