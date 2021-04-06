const express = require('express');
const app = express();

require('./config')(app);
require('./services/auth/passport.js')(app);

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});
