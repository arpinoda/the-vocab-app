const express = require('express');
const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');
const app = express();

require('./config');
require('./services/auth/passport.js')(app);

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});
