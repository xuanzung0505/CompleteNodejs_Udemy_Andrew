const fs = require('fs')
const FILE_NAME = "NOTE_DATA.json"
const chalk = require("chalk")

const saveData = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(FILE_NAME, dataJSON)
}

const addNote = (note) => {
    const data = getNotes()
    data.push(note)
    
    //write file
    try {
        saveData(data)
        // throw new Error()
        console.log(chalk.green("Add the note successfully"))
    } catch (error) {
        console.log(chalk.red("Error while adding note"))
    }
}

const getNotes=() => {
    try {
        //read file
        const dataBuffer = fs.readFileSync(FILE_NAME)
        // throw new Error()
        const data = JSON.parse(dataBuffer.toString())
        debugger

        if (data) //could be ""
            return data
        return []
    } catch (error) {
        // console.log(chalk.red("Error while getting notes"))
        return []
    }
}

const editNote = (id, newData) => {
    let data = getNotes()
    data = data.map((note)=>{
        console.log(JSON.stringify(note))
        if (note.id === id)
            return {...note, ...newData}
        return note
    })

    try {
        saveData(data)
        console.log(chalk.green("Editing the note successfully"))
    } catch (error) {
        console.log(chalk.red("Error while editing the node"))
    }
}

const deleteNote = (id) => {
    let data = getNotes()
    data = data.filter((note)=>note.id !== id)
    try {
        saveData(data)
        console.log(chalk.green("Delete the note successfully"))
    } catch (error) {
        console.log(chalk.red("Error while deleting a node"))
    }
}

module.exports = {
    addNote: addNote,
    editNote: editNote,
    getNotes: getNotes,
    deleteNote: deleteNote
}