const request = require('request')

const geocode = (address , callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZ2hvc3Q3MjEiLCJhIjoiY2p4MDhia2IyMHNsYjN5dGF3bXk4MW9zbCJ9.9HvLbz_t97Cd7GZxJm3NeQ&limit=1'
    request ({ url, json: true},(error , {body})=>{
        if(error){
            callback('Unable to connect to Location services!',undefined)
        }else if(body.message){
            callback('Invalid place name! Try another.', undefined)
        }else if(body.features.length === 0){
            callback('No matching Places found! Try another.',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode