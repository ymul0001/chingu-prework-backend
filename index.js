'use strict';

const env = require('dotenv');
const cors = require('cors');
env.config();

const express = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT;



//configure cors
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'X-Requested-With,content-type,*');
//     next();
// });



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