const express = require('express');
const os = require('os');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 5000;

// Collecte des métriques par défaut pour Prometheus
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Compteur de requêtes personnalisées
const httpRequestCounter = new client.Counter({
  name: 'alitelecom_http_requests_total',
  help: 'Nombre total de requêtes HTTP reçues sur le backend',
  labelNames: ['method', 'route', 'status']
});

// Middleware pour incrémenter le compteur
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Endpoint Métriques pour Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Endpoint Santé / Statut
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    service: 'AliTelecom Backend API',
    hostname: os.hostname(),
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Backend AliTelecom démarré sur le port ${PORT}`);
});
