'use strict';

const env = require('dotenv');
env.config();

const express = require('express');

const app = express();
const PORT = process.env.PORT;

//configure express dependencies
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const CredentialRouter = require('./src/routes/CredentialRoute');
const NoteRouter = require('./src/routes/NoteRoute');

app.use('/v1/credential', CredentialRouter);
app.use('/v1/note', NoteRouter)


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

module.exports = app;