const fs = require('fs')
const FILENAME = '1-json.json'

// const book = {
//     title: "A book title",
//     body: "A book body"
// }

// const bookJSON = JSON.stringify(book)
// // console.log(bookJSON)
// fs.writeFileSync(FILENAME, bookJSON)


// const dataBuffer = fs.readFileSync(FILENAME)
// console.log(dataBuffer.toString())

const dataBuffer = fs.readFileSync(FILENAME)
const data = JSON.parse(dataBuffer.toString())
data.title="new title"
data.body="new body"
data.year=2000
fs.writeFileSync(FILENAME, JSON.stringify(data))