'use strict';

const returnResponse = (res, status, message) => {
    return res.status(status).json({
        status: status,
        message: (message.constructor === Array) ? message[0] : message
    })
}

module.exports = {
    returnResponse
}