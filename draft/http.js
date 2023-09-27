const http = require('http')

const ACCESS_KEY = "b59018cecb9c4a99a6ed251a2dab951e"

const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=37.8267,-122.4233`


const request = http.request(url, (response)=>{
    let data = ''
    response.on('data', (chunk)=>{
        data += chunk.toString()
    })
    response.on("end", ()=>{
        const dataString = JSON.parse(data)
        console.log(dataString)
    })
})

request.on('error', (error)=>{
    console.log(error)
})

request.end()