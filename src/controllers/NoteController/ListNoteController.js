'use strict';

const Note = require('../../models/Note');
const StringUtils = require('../../common/utils/StringUtils');
const ListUtils = require('../../common/utils/ListUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');


const findAll = async (req,res) => {
    const notes = await Note.findAll();
    validateNotesData(res, notes, 'cannot find any notes data');
}

const findNoteByUserId = async (req,res) => {
    const userId = req.query.userid;
    validateParams(res, userId);
    const notes = await Note.findNoteByUserId(userId);
    validateNotesData(res, notes, 'Cannot find any notes data according to the given user id');
}   

const validateParams = (res, userId) => {
    if (StringUtils.isNullOrEmpty(userId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'User id cannot be empty');
    }
}

const validateNotesData = (res, notes, message) => {
    if (ListUtils.isNullOrEmpty(notes[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    return Response.returnResponse(res, StatusCode.status.SUCCESS, notes);
}

module.exports = {
    findAll,
    findNoteByUserId
}