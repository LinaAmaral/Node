const Produtos = require("../models/produtos-model"); //importando o modelo do banco

//definindo a funcionalidade da rota listar_produtos
exports.listar_produtos = (req, res) => {
    Produtos.find({}, (err, elemento) => {
        if (err)
            return res.status(500).send("Erro ao consultar Produto");
        res.render("views/pages/produtos", { item: elemento });
    })
};

exports.cadastrar_produtos_get = (req, res) => {
    res.render("views/pages/formProdutos");
};

exports.cadastrar_produtos_post = (req, res) => {
    let produto = new Produtos();
    produto.nome = req.body.nome;
    produto.vlUnit = req.body.valor;
    produto.codigoBarras = req.body.codBarras;
    produto.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar")
        res.redirect("/produtos");
    })
}

exports.deletar_produtos = (req, res) => {
    var chave = req.params.id;
    Produtos.deleteOne({ _id: chave }, (err) => {
        if (err)
            return res.status(500).send("Erro ao excluir registro")
        res.redirect("/produtos")
    })
}

exports.editar_produto_get = (req,res)=>{
    let id = req.params.id;
    Produtos.findById(id, (err, produto) => {
        if (err)
            return res.status(500).send("Erro ao conectar o banco de dados");
        res.render("views/pages/formEditarProduto", { item: produto })
    });
}

exports.editar_produto_post = (req,res)=>{
    let id = req.body.id;
    Produtos.findById(id, (err, produto) => {
        if (err)
            return res.status(500).send("Erro ao conectar o banco de dados");
        produto.nome = req.body.nome;
        produto.vlUnit = req.body.valor;
        produto.codigoBarras = req.body.codBarras;
        produto.save(err => {
            if (err)
                return res.status(500).send("Erro ao salvar alterações");
            res.redirect("/produtos");
        });
    });
}