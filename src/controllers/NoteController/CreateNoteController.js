'use strict';

const Note = require('../../models/Note');
const StringUtils = require('../../common/utils/StringUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');
const { v4: uuidv4 } = require('uuid');

const saveNote = async (req,res) => {
    const noteId = uuidv4();
    const userId = req.body.userid;
    const noteTitle = req.body.title;
    const noteDesc = req.body.desc;
    validateParams(res, userId, noteTitle, noteDesc);
    if (!StringUtils.isNullOrEmpty(userId) && !StringUtils.isNullOrEmpty(noteTitle) && !StringUtils.isNullOrEmpty(noteDesc)) {
        const noteData = [noteId, userId, noteTitle, noteDesc];
        await createNote(noteData, res);
        return Response.returnResponse(res,StatusCode.status.CREATED, `Note has been successfully created.`);
    }
}

const createNote = async (noteData, res) => {
    try {
        await Note.createNote(noteData);
    }
    catch (e) {
        return Response.returnResponse(res,StatusCode.status.CONFLICT, `Encounter an error when creating note data. ${e}.`);
    }
}


const validateParams = (res, userId, noteTitle, noteDesc) => {
    if (StringUtils.isNullOrEmpty(userId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'user id cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(noteTitle)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'note title cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(noteDesc)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'note description cannot be empty!');
    }
}

module.exports = {
    saveNote
}