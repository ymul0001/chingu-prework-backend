'use strict';

const Note = require('../../models/Note');
const StringUtils = require('../../common/utils/StringUtils');
const ListUtils = require('../../common/utils/ListUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');

const updateNoteById = async (req, res) => {
    const noteId = req.query.noteid;
    const noteTitle = req.body.title;
    const noteDesc = req.body.desc;
    validateQueryParam(res,noteId);
    validateBodyParam(res, noteTitle, noteDesc);
    if (!StringUtils.isNullOrEmpty(noteId) && !StringUtils.isNullOrEmpty(noteTitle) && !StringUtils.isNullOrEmpty(noteDesc)) {
        const noteData = [noteTitle, noteDesc];
        await updateNote(noteData, noteId, res);
        return Response.returnResponse(res,StatusCode.status.UPDATE_SUCCESS, `Note has been successfully updated.`);
    }
}

const updateNote = async (noteData, noteId, res) => {
    try {
        await Note.updateNote(noteData, noteId);
    }
    catch (e) {
        return Response.returnResponse(res,StatusCode.status.CONFLICT, `Encounter an error when updating note data. ${e}.`);
    }
}

const validateQueryParam = (res, noteId) => {
    if (StringUtils.isNullOrEmpty(noteId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'param note id cannot be empty!');
    }
}

const validateBodyParam = (res, noteTitle, noteDesc) => {
    if (StringUtils.isNullOrEmpty(noteTitle)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'note title cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(noteDesc)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'note description cannot be empty!');
    }
}

module.exports = {
    updateNoteById
}