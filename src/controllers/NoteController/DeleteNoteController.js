'use strict';

const Note = require('../../models/Note');
const StringUtils = require('../../common/utils/StringUtils');
const ListUtils = require('../../common/utils/ListUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');

const deleteNoteById = async (req,res) => {
    const noteId = req.query.noteid;
    validateQueryParams(res, noteId);
    await deleteNote(res, noteId);
    return Response.returnResponse(res, StatusCode.status.DELETE_SUCCESS, `Note has been successfully deleted.`);
}

const deleteNote = async (res, noteId) => {
    try {
        await Note.deleteNote(noteId);
    }
    catch (e) {
        return Response.returnResponse(res,StatusCode.status.CONFLICT, `Encounter an error when deleting note data. ${e}.`);
    }
}
const validateQueryParams = (res, noteId) => {
    if (StringUtils.isNullOrEmpty(noteId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'param note id cannot be empty');
    }
}

module.exports = {
    deleteNoteById
}