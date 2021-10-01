'use strict';

const express = require('express');
const cors = require('cors');
const router = express.Router();
const listCredentialController = require('../controllers/CredentialController/ListCredentialController');
const createCredentialController = require('../controllers/CredentialController/CreateCredentialController');

router.get(`/findAll`, listCredentialController.findAll);
router.get(`/findByUserNameAndPassword`, listCredentialController.findCredentialByUserNameAndPassword);
router.post(`/create`, cors(), createCredentialController.saveCredential);

module.exports = router;