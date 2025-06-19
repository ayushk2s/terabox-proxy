const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/terabox', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(
      'https://terabxdownloader.com/wp-admin/admin-ajax.php',
      qs.stringify({
        action: 'terabox_api_request',
        url: url,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
          'Accept': '*/*',
          'Origin': 'https://terabxdownloader.com',
          'Referer': 'https://terabxdownloader.com/',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TeraBox proxy running on port ${PORT}`);
});
