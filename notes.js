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

const removeNote = (title) => {
    const notesBuffer = fs.readFileSync('notes.json');
    const toString = notesBuffer.toString();
    const parseToJson = JSON.parse(toString);
    let newJson = []
    let found = false;
    let counter = 0;
    for(let obj of parseToJson){
        colorLog.info("Counter: " + counter + " / " +  parseToJson.length + " : " + obj.title + " : " + title)
        if (obj.title !== title) {
            newJson.push(obj)
        } else if (obj.title === title){
            found = true;
            delete obj
            colorLog.succ("Removed Note with title: " + title);
        } else if (counter === parseToJson.length){
            if (found === false){
                colorLog.warning("Could not find the note to delete.");
            }
            break;
        }
        counter++;
    }
    saveNotes(newJson)
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
    addNote,
    removeNote,
}