const {Schema, model} = require('mongoose');

const generoSchema = new Schema({

    genero: {type: String, required: true}
}, {
    timestamp: true
});

module.exports = model('generos', generoSchema);