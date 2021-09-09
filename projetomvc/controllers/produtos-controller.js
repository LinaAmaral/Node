const Produtos = require("../models/produtos-model"); //importando o modelo do banco

//definindo a funcionalidade da rota listar_produtos
exports.listar_produtos = (req, res) => {
    Produtos.find({}, (err, elemento) => {
        if (err)
            return res.status(500).send("Erro ao consultar Produto");
        res.render("views/pages/produtos", { item: elemento });
    })
};