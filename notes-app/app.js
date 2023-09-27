//run node app.js add --title="title"
const yargs = require("yargs")
const uuid = require("uuid")
const Note = require("./model")
const services = require("./services")

// console.log(process.argv)
// console.log(yargs.argv)

//run node with --version
// yargs.version("1.1.0")
//creating yargs command
yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "this is title",
            demandOption: true, //make title required
            type: 'string'
        },
        body: {
            describe: "this is body",
            demandOption: true, //make body required
            type: 'string'
        }
    },
    handler: (argv) => {
        const note = new Note(uuid.v4(), argv.title, argv.body)
        services.addNote(note)
    }
})
yargs.command({
    command: "list",
    describe: "list notes",
    handler: () => {
        const data = services.getNotes()
        if (data) console.log(JSON.stringify(data))
    }
})
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        id: {
            describe: "the id of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        services.deleteNote(argv.id)
    }
})
yargs.command({
    command: "edit",
    describe: "edit a note",
    builder: {
        id: {
            describe: "the id of the note",
            demandOption: true,
            type: "string"
        },
        title: {
            describe: "the title of the note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "the body of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        let newData = { title: argv.title, body: argv.body }
        services.editNote(argv.id, newData)
    }
})
yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
        id: {
            describe: "the id of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("reading a note")
    }
})

yargs.parse()