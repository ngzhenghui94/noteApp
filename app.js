const chalk = require('chalk')
const yargs = require('yargs')
const { addNote, getNotes } = require('./notes')

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
    handler:(argv)=>{
        addNote(argv.title, argv.desc, argv.due)
    }
})

yargs.command({
    command: 'view',
    describe: 'View notes',
    handler:()=>{
        getNotes()
    }
})


yargs.argv