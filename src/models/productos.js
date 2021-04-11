const {Schema, model} = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const productosSchema = new Schema({

    product: {type: String, required: true},
    description: {type: String, required: true},
    genre: {type: Array, required: true},
    price: {type: Float, required: true},
    employee: {type: String, required:true},
    discount: {type: Number},
    newprice: {type: Float},
    sale: {type: Boolean, default: false},
    premiere: {type: Boolean, default: false},
    image: {type: String, required: true},
    public_id: {type: String, required: true},
    trailer: {type: String, required: true},
    developer:{type: String, required: true},
    editora: {type: String, required: true},
    esrb: {type: String, requires: true},
    wos: {type: Boolean, default: false},
    wli: {type: Boolean, default: false},
    wapp: {type: Boolean, default: false},
    fulldesc: {type: String, required: true},
    espmin: {
        mos: {type: String, required: true},
        mproc: {type: String, required: true},
        mgpu: {type: String, required: true},
        mram: {type: String, required: true},
        mstorage: {type: String, required: true}
    },
    esprec: {
        ros: {type: String, required: true},
        rproc: {type: String, required: true},
        rgpu: {type: String, required: true},
        rram: {type: String, required: true},
        rstorage: {type: String, required: true}
    },
    lang: {type: Array, required: true},
    review: {
        recomendation: {type: Number, required: true},
        average: {type: Float, required: true},
        urloc: {type: String, required: true}
    },
    ocraiting: {type: String, required: true}

}, {
    timestamps:true
});

module.exports = model('productos', productosSchema);
