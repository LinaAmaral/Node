var express = require("express");
var mongoose = require("mongoose"); //importando os modulos que vou utilizar express(framework) e mongoose(ferramenta para escrever no banco de dados pq não to usando sql)

const app = express(); //criando uma aplicação do express
const porta = 3000; // definindo a porta

//aqui estou conectabdo meu banco de dados, com parametros de tratamento de erros
mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/vendas?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

//estou criando um modelo que irá compor a collection do banco
const Produtos = mongoose.model("produtos", {
    nome: String,
    vlUnit: Number,
    codigoBarras: String,
});

//chamando o motor de visualização que é o ejs
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");

//aqui estou permitindo que os dados passem de uma página para a outra em modo json por ser mais leve
//estou chamando um método de uma classe
app.use(express.urlencoded());
app.use(express.json());

//aqui estou criando minha rota principal
app.get("/", (req, res) => {
    res.send("Página inicial");
});

//criando uma rota para listar os produtos cadastrados
app.get("/produtos", (req, res) => {
    let produtos = Produtos.find({},(err, elemento)=>{
        if(err)
            return res.status(500).send("Erro ao consultar Produto");
        res.render("produtos",{item:elemento});
    })
});
//esse produtos da linha 36 em vermelho é a rota
//esse item da linha 36 é igual ao da linha 34 de produtos.ejs

//renderizando a minha página de produtos
app.get("/cadastrarProdutos", (req, res) => {
    res.render("form_produtos");
})

//aqui eu vou usar o posto para guardar as infomrações do formulário no banco de dados
app.post("/cadastrarProdutos", (req,res)=>{
    let produto = new Produtos(); //minha variável está recebendo o objeto do tipo produtos - linha 10
    produto.nome = req.body.nome;
    produto.vlUnit = req.body.valor;
    produto.codigoBarras = req.body.codBarras;
    produto.save((err)=>{
        if(err)
            return res.status(500).send("Erro ao cadastrar")
        return res.redirect("/produtos");
    })
})

app.get("/deletarProduto/:id", (req,res)=>{
    var chave = req.params.id;
    Produtos.deleteOne({_id:chave},(err,result)=>{

        if(err)
        return res.status(500).send("Erro ao excluir registro")
    res.redirect("/produtos")
    })
})

app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});