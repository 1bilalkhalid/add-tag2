const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(express.json());

const allowedTags = ['lead', 'client', 'vip', 'follow-up'];

app.post('/add-tag', async (req, res) => {
  const { contactId, tag } = req.body;

  if (!allowedTags.includes(tag)) {
    return res.status(403).json({ message: 'Tag not allowed' });
  }

  try {
    const response = await axios.put(
      `https://rest.gohighlevel.com/v1/contacts/${contactId}/tags/${tag}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({ success: true, response: response.data });
  } catch (error) {
    return res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.get('/', (req, res) => {
  res.send('GHL Tag Control API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
