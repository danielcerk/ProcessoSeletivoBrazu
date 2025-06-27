require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const app = express();
const port = 3000;

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigin = isProduction
  ? 'https://processo-seletivo-brazu.vercel.app/'
  : 'http://localhost:5173';

app.use(cors({

  origin: allowedOrigin,

}));

const credentials = {

  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN

};

const analyticsDataClient = new BetaAnalyticsDataClient({

  credentials,

});

app.get("/api/visitors", async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }]
    });

    const rows = response.rows || [];
    const data = rows.map(row => ({
      date: row.dimensionValues[0].value,
      visitors: row.metricValues[0].value
    }));

    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar dados do GA4:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em modo ${isProduction ? 'produção' : 'desenvolvimento'} na porta ${port}`);
});
