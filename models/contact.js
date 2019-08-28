const mongoose = require('mongoose');
var Schema = mongoose.Schema;


let contactSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: false
    }
});

let Contact = module.exports = mongoose.model('resume', contactSchema);