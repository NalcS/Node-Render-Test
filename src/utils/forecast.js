const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9d914a7a17e62f4cdb924769bfc53b39&units=m&query=' + lat + ',' + lon
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to weather services.", undefined)
        }
        else if(body.error) {
            callback("Couldn't fetch the weather.", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees.")
        }
    })

}




module.exports = {
    forecast: forecast
}