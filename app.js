const chalk = require('chalk')
const yargs = require('yargs')
const {addNote, getNotes, removeNote} = require('./notes')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'New Note Title',
            demandOption: true,
            type: 'string',
        },
        desc: {
            describe: 'Note Description',
            demandOption: true,
            type: 'string',
        },
        due: {
            describe: 'Due Date',
            demandOption: false,
            type: 'string',
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.desc, argv.due)
    }
})

yargs.command({
    command: ['view', 'list'],
    describe: 'View notes',
    handler: () => {
        getNotes()
    }
})


yargs.command({
    command: ['remove', 'delete'],
    describe: 'Remove note by title',
    builder: {
        title: {
            describe: "Note to remove by title",
            demandOption: false,
            type: 'string'
        },
        id: {
            describe: "Note to remove by id",
            demandOption: false,
            type: 'integer'
        },
    },
    handler: (argv) => {
        removeNote(argv.id, argv.title)
    }
})


yargs.argv