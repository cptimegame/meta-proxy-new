import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const BASE_URL = "https://graph.facebook.com/v23.0";

app.post("/createCampaign", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/act_1070985436957250/campaigns`,
      {
        name: req.body.name,
        objective: req.body.objective,
        status: req.body.status,
        special_ad_categories: req.body.special_ad_categories || []
      },
      {
        headers: {
          Authorization: `Bearer ${META_ACCESS_TOKEN}`
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json(err.response ? err.response.data : { error: err.message });
  }
});

app.get("/", (req, res) => res.send("✅ Meta Proxy Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
