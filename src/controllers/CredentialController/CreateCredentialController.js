'use strict';

const Credential = require('../../models/Credential');
const StringUtils = require('../../common/utils/StringUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const saveCredential = async (req,res) => {
    const userId = uuidv4();
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    validateParams(res, userId, userName, email, password);
    if (password === confirmPassword) {
        const credentialData = [userId, userName, email, crypto.createHash('md5').update(password).digest('hex')];
        await createCredential(credentialData, res);
        return Response.returnResponse(res,StatusCode.status.CREATED, `Credential has been successfully created.`);
    }
}

const createCredential = async (credentialData, res) => {
    try {
        await Credential.createCredential(credentialData);
    }
    catch (e) {
        return Response.returnResponse(res,StatusCode.status.CONFLICT, `Encounter an error when creating user credential data. ${e}.`);
    }
}

const validateParams = (res, userId, userName, email, password) => {
    if (StringUtils.isNullOrEmpty(userId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'user id cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(userName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'user name cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(email)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'email cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(password)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'password cannot be empty!');
    }
}

module.exports = {
    saveCredential
}