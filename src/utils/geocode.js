const request = require('request')


const geocode = (adress, callback) => {
    const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(adress) + '.json?key=bBx3cZ3sVJPHc2OMAo3b6KwTJO0tq3FM'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.detailedError || body.results.length<1){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined,  {
                lat:body.results[0].position.lat,
                lon: body.results[0].position.lon,
                location: body.results[0].address
            })
        }
    })
}

module.exports = {
    geocode: geocode
}