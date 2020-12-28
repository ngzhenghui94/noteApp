const fs = require('fs')
const colorLog = require('./utils')


const getNotes = () => {
    const notesBuffer = fs.readFileSync('notes.json')
    const toString = notesBuffer.toString();
    const parseJSON = JSON.parse(toString);
    for(let obj of parseJSON){
        colorLog.info(JSON.stringify(obj), '\n');
    }
}

const addNote = (title, desc, due) => {
    const notes = loadNotes();
    const checkDuplicate = notes.filter((note)=>{
        return note.title === title
    })
    if(checkDuplicate.length === 0){
        notes.push({
            title: title,
            desc: desc,
            due: due,
        })
        saveNotes(notes)
        colorLog.succ("Note Added Successfully");
    }else{
        colorLog.err("Duplicated note");
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
    } catch(e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote
}