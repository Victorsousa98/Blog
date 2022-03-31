const express = require('express');
const router = express.Router();//Router é um middleware que permite que você crie rotas para sua aplicação.

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/posts', (req, res) => {
    res.send('Página de posts do admin');
});

router.get("/categorias", (req, res) => {
    res.render("admin/categorias");
});

router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategoria");
});

router.post("/categorias/nova", (req, res) => {
    res.send("Recebendo dados da categoria: " + req.body.nome);
});


module.exports = router