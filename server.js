require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

// Endpoint to handle both city-based and lat/lon queries
app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  // Validate input: either city or both lat and lon should be provided.
  if (!city && (!lat || !lon)) {
    return res.status(400).json({ error: 'You must provide either a city or latitude and longitude.' });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const params = {
    appid: apiKey,
    units: 'metric',
  };

  // If latitude and longitude are provided, use them
  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  } else {
    // Otherwise, use city
    params.q = city;
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Optional: For backward compatibility, you can have the /api/weather/:city route
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required in the URL' });
  }
  const apiKey = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
