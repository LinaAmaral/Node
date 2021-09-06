var express = require("express");
var mongoose = require("mongoose");
const app = express();
const porta = 3000;

mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/escola?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const alunos = mongoose.model("alunos", {
    nome: String,
    data_nascimento: String,
    turma: String,
    matricula: Number
})

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/alunos", (req, res) => {

    alunos.find({}, (err, elementos) => {
        if (err)
            return res.status(500).send("Erro ao consultar o banco");
        res.render("alunos", { itens: elementos });
    });
});

app.get("/cadastrarAlunos", (req, res) => {
    res.render("form_aluno");
})
app.post("/cadastrarAlunos", (req, res) => {

    let aluno = new alunos();
    aluno.nome = req.body.nome
    aluno.data_nascimento = req.body.data_nascimento
    aluno.turma = req.body.turma
    aluno.matricula = req.body.matricula

    aluno.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar aluno")
        return res.redirect("/alunos");
    })
})

app.get("/deletarAluno/:id", (req, res) => {
    var chave = req.params.id;
    alunos.deleteOne({ _id: chave }, (err, result) => {
        if (err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/alunos")
    })
})

app.get("/editarAluno/:id", (req, res) => {

    var id = req.params.id;

    alunos.findById(id, (err, aluno) => {
        if (err)
            return res.status(500).send("Erro ao conectar o banco de dados");
        res.render("formEditar", { item: aluno })
    });
});

app.post("/editarAluno", (req, res) => {

    var id = req.body.id;

    alunos.findById(id, (err, aluno) => {
        if (err)
            return res.status(500).send("Erro ao conectar o banco de dados");

        aluno.nome = req.body.nome;
        aluno.data_nascimento = req.body.data_nascimento;
        aluno.turma = req.body.turma;
        aluno.matricula = req.body.matricula;

        aluno.save(err => {
            if (err)
                return res.status(500).send("Erro ao salvar alterações");
            res.redirect("/alunos");
        });
    });
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});
