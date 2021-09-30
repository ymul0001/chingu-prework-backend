'use strict';

const mysqlService = require('../services/mysql');

const findAll = () => {
    return mysqlService.execute(`SELECT * FROM note`);
}

const findNoteByUserId = (userId) => {
    return mysqlService.execute(`SELECT * FROM note WHERE user_id = '${userId}'`);
}

const createNote = (params) => {
    return mysqlService.execute(`INSERT INTO note (note_id, user_id, note_title, note_description) VALUES (?,?,?,?)`, params);
} 

const updateNote = (params, noteId) => {
    return mysqlService.execute(`UPDATE note SET note_title = '${params[0]}', note_description = '${params[1]}' WHERE note_id = '${noteId}'`);
}

const deleteNote = (noteId) => {
    return mysqlService.execute(`DELETE FROM note WHERE note_id = '${noteId}'`);
}

module.exports = {
    findAll,
    findNoteByUserId,
    createNote,
    updateNote,
    deleteNote
}