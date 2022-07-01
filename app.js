const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const { DB_HOST } = process.env;
const mongoose = require('mongoose');

mongoose
  .connect(DB_HOST)
      .then(() => console.log('Database connection successful'))
      .catch((e) => { 
        console.log(e.message); 
        process.exit(1);
      });

const { usersRouter, contactsRouter } = require('./routes/api/index');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

module.exports = app;
