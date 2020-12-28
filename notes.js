const fs = require('fs')
const colorLog = require('./utils')


const getNotes = () => {
    const notesBuffer = fs.readFileSync('notes.json')
    const toString = notesBuffer.toString();
    const parseJSON = JSON.parse(toString);
    for (let obj of parseJSON) {
        colorLog.info(JSON.stringify(obj), '\n');
    }
}

const addNote = (title, desc, due) => {
    const notes = loadNotes();
    let getId = notes.length + 1;
    const checkDuplicate = notes.filter((note) => {
        return note.title === title
    })

    if (checkDuplicate.length === 0) {
        notes.push({
            id: getId,
            title: title,
            desc: desc,
            due: due,
        })
        saveNotes(notes)
        colorLog.succ("Note Added Successfully");
    } else {
        colorLog.err("Duplicated note");
    }
}

const removeNote = (id, title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return ((note.id !== id) && (note.title !== title))
    })
    colorLog.info(notesToKeep)
    if (notes.length > notesToKeep.length) {
        colorLog.succ("Note Removed Successfully");
        saveNotes(notesToKeep)
    } else {
        colorLog.err("No note found");
    }
}

const saveNotes = (note) => {
    const dataJSON = JSON.stringify(note);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        const dataParsed = JSON.parse(dataJSON);
        return dataParsed;
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
}