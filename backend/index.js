require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const app = express();
const port = 3000;

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'service-account.json'
});

app.use(cors({
  origin: 'http://localhost:5173',
}));

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
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
