require('dotenv').config()
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (or restrict to your frontend origin)
app.use(cors({
  origin: 'https://astroguide1.netlify.app', // Replace with your frontend URL
}));

// Middleware to parse JSON request bodies
app.use(express.json());
app.post('/api/horoscope-chart-svg', (req, res) => {
    const {
      year, month, date, hours, minutes, seconds, latitude, longitude, timezone
    } = req.body;
  
    const config = req.body.config || {
      observation_point: "topocentric",
      ayanamsha: "lahiri"
    };
  
    if (
      !year || !month || !date || !hours || !minutes || !seconds ||
      !latitude || !longitude || !timezone
    ) {
      return res.status(400).json({ error: 'Missing required fields in the request body.' });
    }
  
    const options = {
      method: 'POST',
      url: 'https://json.freeastrologyapi.com/horoscope-chart-svg-code',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.XAPIKEY
      },
      body: JSON.stringify({
        year, month, date, hours, minutes, seconds,
        latitude, longitude, timezone, config
      })
    };
  
    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
      }
      res.status(response.statusCode).send(body);
    });
  });
// Route for navamsa chart info API call
app.post('/api/navamsa-chart-info', (req, res) => {
  const {
    year, month, date, hours, minutes, seconds, latitude, longitude, timezone, settings
  } = req.body;

  if (
    !year ||
    !month ||
    !date ||
    !hours ||
    !minutes ||
    !seconds ||
    !latitude ||
    !longitude ||
    !timezone ||
    !settings ||
    !settings.observation_point ||
    !settings.ayanamsha
  ) {
    return res.status(400).json({ error: 'Missing required fields in the request body.' });
  }

  const options = {
    method: 'POST',
    url: 'https://json.freeastrologyapi.com/navamsa-chart-info',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.XAPIKEY
    },
    body: JSON.stringify({
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      latitude,
      longitude,
      timezone,
      settings
    })
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }

    res.status(response.statusCode).send(body);
  });
});


app.post('/api/transit-calculator', (req, res) => {
  const {
    year, month, date, hours, minutes, seconds, latitude, longitude, timezone
  } = req.body;

  if (
    !year ||
    !month ||
    !date ||
    !hours ||
    !minutes ||
    !seconds ||
    !latitude ||
    !longitude ||
    !timezone
  ) {
    return res.status(400).json({ error: 'Missing required fields in the request body.' });
  }

  const options = {
    method: 'POST',
    url: 'https://api.prokerala.com/astrology/transit-calculator',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.PROKERALA // Replace with your Prokerala API key
    },
    body: JSON.stringify({
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      latitude,
      longitude,
      timezone
    })
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }

    res.status(response.statusCode).send(body);
  });
});


app.post('/api/planets-extended', (req, res) => {
  const { year, month, date, hours, minutes, seconds, latitude, longitude, timezone, settings } = req.body;

  if (!year || !month || !date || !hours || !minutes || !seconds || !latitude || !longitude || !timezone || !settings) {
    return res.status(400).json({ error: 'Missing required fields in the request body.' });
  }

  const options = {
    method: 'POST',
    url: 'https://json.apiastro.com/planets/extended',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.XAPIKEY, // Replace with your API key
    },
    body: JSON.stringify({
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      latitude,
      longitude,
      timezone,
      settings,
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }

    res.status(response.statusCode).send(body);
  });
});

app.post('/api/yoga-durations', (req, res) => {
    const { year, month, date, hours, minutes, seconds, latitude, longitude, timezone, config } = req.body;
  
    // Input validation
    if (!year || !month || !date || !hours || !minutes || !seconds || !latitude || !longitude || !timezone) {
      return res.status(400).json({ error: 'Missing required fields in the request body.' });
    }
  
    const requestOptions = {
      method: 'POST',
      url: 'https://json.freeastrologyapi.com/yoga-durations',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.XAPIKEY, // Use API key from .env file
      },
      body: JSON.stringify({
        year,
        month,
        date,
        hours,
        minutes,
        seconds,
        latitude,
        longitude,
        timezone,
        config: config || { // Default config if not provided
          observation_point: 'topocentric',
          ayanamsha: 'lahiri',
        },
      }),
    };
  
    // External API call
    request(requestOptions, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
      }
  
      res.status(response.statusCode).send(body); // Pass through the response
    });
  });
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
