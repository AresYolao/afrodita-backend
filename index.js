const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar CORS

app.use(cors());

//Base de Datos
dbConnection();

// console.log(process.env);

//8wZk4OdBsMJiF1ZZ
//afrodita


//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});