const mongoose = require('mongoose');

const CrudSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    language: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

const crud = mongoose.model('crud', CrudSchema);

module.exports = crud;