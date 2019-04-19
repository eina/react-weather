require('dotenv').config();
const axios = require('axios');

exports.handler = (event) => {
  // console.log('hello???', JSON.parse(event.body))
  const data = JSON.parse(event.body);

  if(data && data.locationQuery) {
    return axios.get('https://api.opencagedata.com/geocode/v1/json?', {
      params: {
        key: encodeURIComponent(process.env.REACT_APP_OPENCAGE_KEY),
        q: encodeURIComponent(data.locationQuery),
        no_annotations: 1,
        pretty: 1
      }
    })
      .then(res => {
        // only take the first result returned for now
        const coords = res && res.data && res.data.results && res.data.results[0] && res.data.results[0].geometry ? res.data.results[0].geometry : null;
        return Promise.resolve({
          statusCode: 200,
          body: JSON.stringify(coords)
        })
      })
      .catch(err => {
        console.log('error', err)
        return ({
          statusCode: 400,
          body: JSON.stringify(err)
        })
      })
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No location provided"
      })
    }
  }
}

