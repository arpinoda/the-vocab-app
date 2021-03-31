const express = require('express');
const router = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

app.use(function (req, res, next) {
    res.status(404).send('Sorry, can\'t find that!');
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});
