const axios = require('axios');

exports.handler = (event) => {
  const data = JSON.parse(event.body),
    lat = encodeURIComponent(data.lat),
    lng = encodeURIComponent(data.lng),
    reqKey = encodeURIComponent(process.env.REACT_APP_DARK_SKY_KEY);

  if(lat && lng) {
    return axios.get(`https://api.darksky.net/forecast/${reqKey}/${lat},${lng}`, {
      params: {
        exclude: 'minutely,hourly,daily,flags'
      }
    })
      .then(weather => {
        return {
          statusCode: 200,
          // stringify for return to front end
          body: JSON.stringify({
            data: weather.data
          })
        }
      })
      .catch(err => {
        console.log('error', err)
        return ({
          statusCode: 400,
          body: err
        })
      })
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Latitude and/or longitude values are missing"
      })
    }
  }

}