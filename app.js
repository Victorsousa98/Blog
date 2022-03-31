//Importando modulos
    const express = require('express'); 
    const handlebars = require('express-handlebars'); 
    const bodyParser = require('body-parser'); 
    const mongoose = require('mongoose'); 
    const path = require('path'); //path é um modulo do node que permite que você manipule caminhos de arquivos.
    const session = require('express-session'); //express-session é um modulo do node que permite que você crie sessões para seu aplicativo.
    const flash = require('connect-flash');//connect-flash é um modulo do node que permite que você crie mensagens de sucesso e erro para seu aplicativo.

    const app = express(); // instancia express

//Configurações
    //Sessão
        app.use(session({
            secret: 'secret', //chave secreta para criptografar a sessão
            resave: true, //se a sessão for alterada, o servidor salva novamente
            saveUninitialized: true //se a sessão for criada, o servidor salva novamente
        }));
    //Flash
        app.use(flash());    
    
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg"); //res.locals é um objeto que permite que você armazene dados na sessão.
            res.locals.error_msg = req.flash("error_msg");
            next();
        });

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