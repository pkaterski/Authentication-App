const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

mongoose.connect(config.dbstr, (err) => {
    if (err) console.error(err);
    else console.log('Successfully Connected to Database\n');
});

const app = express();

const users = require('./routes/users');

app.use(cors());

app.use(express.static(path.join(__dirname ,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});