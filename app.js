const chalk = require('chalk')
const yargs = require('yargs')
const { addNote, getNotes, removeNote } = require('./notes')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'New Note Title',
            demandOption: true,
            type: 'string',
        },
        desc:{
            describe: 'Note Description',
            demandOption: true,
            type: 'string',
        },
        due:{
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
    command: 'view',
    describe: 'View notes',
    handler: () => {
        getNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by title',
    builder:{
        title:{
            describe:"Note to remove by title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
    }
})


yargs.argv