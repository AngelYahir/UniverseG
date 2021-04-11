const {Schema, model} = require('mongoose');

const idiomaSchema = new Schema({
    language: {type: String, required: true}
}, {
    timestamp: true
});

module.exports = model('idiomas', idiomaSchema);