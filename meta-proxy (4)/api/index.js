const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.AD_ACCOUNT_ID;

// Test route
app.get("/", (req, res) => {
  res.send("✅ Meta Ads Proxy is running on Vercel!");
});

// Create Campaign
app.post("/createCampaign", async (req, res) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v23.0/act_${AD_ACCOUNT_ID}/campaigns`,
      {
        name: req.body.name || "CP|TestCampaign",
        objective: req.body.objective || "OUTCOME_SALES",
        status: req.body.status || "ACTIVE",
        special_ad_categories: req.body.special_ad_categories || []
      },
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: error.message });
  }
});

module.exports = app;
