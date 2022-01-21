const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(
            process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('BD conectado');
    }
    catch( e ) {
        console.log( e );
        throw new Error('Error al conectarse a la BD')
    }
}

module.exports = { dbConnection }