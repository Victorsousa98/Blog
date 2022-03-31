//Importando modulos
    const express = require('express'); 
    const handlebars = require('express-handlebars'); 
    const bodyParser = require('body-parser'); 
    const mongoose = require('mongoose'); 
    const path = require('path'); //path é um modulo do node que permite que você manipule caminhos de arquivos.

    const app = express(); // instancia express

//Configurações
    //Body-parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    
    //Mongoose
        mongoose.connect('mongodb://localhost/blogapp')
            .then(() => console.log('MongoDB conectado...'))
            .catch(err => console.log("Erro ao conectar no MongoDB: " + err));
        mongoose.Promise = global.Promise;

    //Public
        app.use(express.static(path.join(__dirname, '/public')));


//Rotas
    //admin
        const admin = require('./routes/admin');
        app.use('/admin', admin);
//Outros
    const PORT = 8081; // porta do servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });