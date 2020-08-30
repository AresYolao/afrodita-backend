const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

        console.log('AfroditaDB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de Datos');
    }




}

module.exports = {
    dbConnection
}