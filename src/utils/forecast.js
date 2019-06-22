const request = require('request')

const forecast = (latitude , longitude, callback)=>{
    url = 'https://api.darksky.net/forecast/a95308bd8841739bfa9560f50621ebf9/'+ latitude + ',' + longitude+ '?units=si'

    request({ url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to Weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            // callback(undefined, body.daily.data[0].summary +' It is currently '+ body.currently.temperature + ' degree out. There is ' + body.currently.precipProbability + '% chances of Rain.')
            callback(undefined, {
                summary : body.daily.data[0].summary,
                currentTemperature : body.currently.temperature,
                rainChance : body.currently.precipProbability,
                minTemp : body.daily.data[0].temperatureMin,
                maxTemp : body.daily.data[0].temperatureMax
            })
        }
    })
}

module.exports = forecast