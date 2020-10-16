const request = require('request')

const forecast = (unit, latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77d3d7968e22ea77641a56643793ebe6&query=' + latitude + ',' + longitude + '&units='+ unit
    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to location services', undefined, undefined)
      } else if (body.error) {
        callback('unable to find location for' + latitude + longitude + unit + undefined, undefined)
      } else {
        callback(undefined, 
         `It is currently ${body.current.weather_descriptions[0]}
          Temperature is: ${body.current.temperature} deegree(s) ${(unit === 'f') ? 'F' : 'C'}
          Feel like temperature is ${body.current.feelslike} ${(unit === 'f') ? 'F' : 'C'}
          The humidity is  ${body.current.humidity}`, `${body.current.weather_icons}`)
      } 
    })
}

module.exports = forecast