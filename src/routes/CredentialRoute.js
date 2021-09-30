'use strict';

const express = require('express');
const router = express.Router();
const listCredentialController = require('../controllers/CredentialController/ListCredentialController');
const createCredentialController = require('../controllers/CredentialController/CreateCredentialController');

router.get(`/findAll`, listCredentialController.findAll);
router.get(`/findByUserNameAndPassword`, listCredentialController.findCredentialByUserNameAndPassword);
router.post(`/create`, createCredentialController.saveCredential);

module.exports = router;