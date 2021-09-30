'use strict';

const Credential = require('../../models/Credential');
const StringUtils = require('../../common/utils/StringUtils');
const ListUtils = require('../../common/utils/ListUtils');
const Response = require('../../common/responses/Response');
const StatusCode = require('../../common/constant/StatusCode');
const crypto = require('crypto');

const findAll = async (req,res) => {
    const credentials = await Credential.findAll();
    validateCredentialsData(res, credentials, 'cannot find credential data');
}

const findCredentialByUserNameAndPassword = async (req,res) => {
    const userName = req.query.username;
    const rawPassword = req.query.password;
    validateLoginParams(res, userName, rawPassword);
    const password = crypto.createHash('md5').update(rawPassword).digest('hex');
    const credentials = await Credential.findCredentialByUserNameAndPassword(userName, password);
    validateCredentialsData(res, credentials, 'cannot find any credentials according to the given username and password');
}

const validateLoginParams = (res, userName, password) => {
    if (StringUtils.isNullOrEmpty(userName) && StringUtils.isNullOrEmpty(password)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'username and password cannot be empty');
    }
    if (StringUtils.isNullOrEmpty(userName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'username cannot be empty');
    }
    if (StringUtils.isNullOrEmpty(password) && !StringUtils.isNullOrEmpty(userName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'password cannot be empty');
    }
}

const validateCredentialsData = (res, credentials, message) => {
    if (ListUtils.isNullOrEmpty(credentials[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    return Response.returnResponse(res, StatusCode.status.SUCCESS, credentials);
}


module.exports = {
    findAll,
    findCredentialByUserNameAndPassword
}