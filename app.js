//Importando modulos
    const express = require('express'); // import express
    const handlebars = require('express-handlebars'); // import handlebars
    const bodyParser = require('body-parser'); // import body-parser
//  const mongoose = require('mongoose'); // import mongoose

    const app = express(); // instancia express

//Configurações
    //Body-parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    
    //Mongoose
        // mongoose.connect('mongodb://localhost/db_name');
        // mongoose.Promise = global.Promise;

//Rotas
    //admin
        const admin = require('./routes/admin');
        app.use('/admin', admin);
//Outros
    const PORT = 8081; // porta do servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });