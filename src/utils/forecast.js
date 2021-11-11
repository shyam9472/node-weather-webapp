const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1fbc1d0575ed2cc2b853448b56342ed2&query=' + longitude + ',' + latitude + '&units=f'
  request({url, json:true}, (error, {body}) => {
      if (error) {
          callback("Unable to connect to weather stack API! Check you network connection.", undefined)
      }
      else if (body.error) {
          callback(body.info, undefined)
      }
      else {
          callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
      }
  })
}

module.exports = forecast