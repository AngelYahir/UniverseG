const mongoose = require('mongoose');


//Configuracion de mongoose
// const MONGODB_URI = 'mongodb://localhost/universe'

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useCreateIndex: true
})
