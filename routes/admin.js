const express = require('express');
const router = express.Router();//Router é um middleware que permite que você crie rotas para sua aplicação.

const Categoria = require("../models/Categoria");

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/posts', (req, res) => {
    res.send('Página de posts do admin');
});

router.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("admin/categorias", {categorias: categorias});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect("/admin");
    });
});

router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategoria");
});

router.post("/categorias/nova", (req, res) => {
    
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"});
    }

    if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros});
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!");
            res.redirect("/admin/categorias");
        });
    }
});

//editar categorias
router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {//lean() retorna um objeto json, sem o mongoose
        res.render("admin/editcategorias", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe");
        res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria");
            res.redirect("/admin/categorias");
        });

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar", (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!");
        res.redirect("/admin/categorias");
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria");
        res.redirect("/admin/categorias");
    });
});

module.exports = router