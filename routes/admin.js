const express = require('express');
const router = express.Router();//Router é um middleware que permite que você crie rotas para sua aplicação.

router.get('/', (req, res) => {
    res.send('Página inicial do admin');
});

router.get('/posts', (req, res) => {
    res.send('Página de posts do admin');
});

router.get("/categorias", (req, res) => {
    res.send("Página de categorias do admin");
});


module.exports = router