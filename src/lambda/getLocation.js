require('dotenv').config();
const axios = require('axios');
const https = require('https');

exports.handler = (event) => {
  const data = event.body && event.body.locationQuery ? event.body.locationQuery : null;

  return axios.get('https://api.opencagedata.com/geocode/v1/json?', {
    params: {
      key: encodeURIComponent(process.env.REACT_APP_OPENCAGE_KEY),
      q: encodeURIComponent(data),
      no_annotations: 1,
      pretty: 1
    }
  })
    .then(res => {
      const coords = res && res.data && res.data.results && res.data.results[0] && res.data.results[0].geometry ? res.data.results[0].geometry : null;
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify(coords)
      })
    })
    .catch(err => {
      return ({
        statusCode: 400,
        body: err
      })
    })
}

