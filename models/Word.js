const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
    value: String,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
});

mongoose.model('Word', wordSchema);
