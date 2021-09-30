'use strict';

const express = require('express');
const router = express.Router();
const ListNotesController = require('../controllers/NoteController/ListNoteController');
const CreateNoteController = require('../controllers/NoteController/CreateNoteController');
const UpdateNoteController = require('../controllers/NoteController/UpdateNoteController');
const DeleteNoteController = require('../controllers/NoteController/DeleteNoteController');

router.get(`/findAll`, ListNotesController.findAll);
router.get(`/findByUserId`, ListNotesController.findNoteByUserId);
router.post(`/create`, CreateNoteController.saveNote);
router.put(`/updateById`, UpdateNoteController.updateNoteById);
router.delete(`/deleteById`, DeleteNoteController.deleteNoteById);

module.exports = router;