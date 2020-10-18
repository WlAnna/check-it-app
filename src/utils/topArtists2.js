const request = require('request')

const topArtists2 = (address, callback) => {
    const url = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + address + '&api_key=c2223c30be336e50fdd318988e98413a&format=json&limit=10'
    
    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to services', undefined)
      } else if (body.error) {
        callback('Unable to find location. Find different search terms.', undefined)
      } else {
        callback(undefined, {
          topArtista: body.topartists.artist,
          location: address
        })
      } 
    })
  }
  
  module.exports = topArtists2

