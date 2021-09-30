'use strict';

const mysqlService = require('../services/mysql');

const findAll = () => {
    return mysqlService.execute(`SELECT * FROM credential`);
}

const findCredentialById = () => {
    return mysqlService.execute(`SELECT * FROM credential WHERE user_id = ${userId}`);
}

const findCredentialByUserNameAndPassword = (userName, password) => {
    return mysqlService.execute(`SELECT * FROM credential WHERE user_name = '${userName}' AND password = '${password}'`);
}

const createCredential = (params) => {
    return mysqlService.execute(`INSERT INTO credential (user_id, user_name, email, password) VALUES (?,?,?,?)`, params);
}


module.exports = {
    findAll,
    findCredentialById,
    findCredentialByUserNameAndPassword,
    createCredential
}