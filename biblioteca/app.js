var express = require("express");
var mongoose = require("mongoose");

const app = express();
const porta = 3000;

mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/biblioteca?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

const Livros = mongoose.model("livros", {
    titulo: String,
    autor: String,
    isbn: Number,
    editora: String,
    volume: Number,
})

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
	

app.get("/", (req, res) => {
    res.send("Página inicial");
});
app.get("/livros", (req, res) => {
    Livros.find({}, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao consultar banco de dados");
        res.render("livros", { livro: livro });
    })
});
app.get("/cadastrarLivro", (req, res) => {
    res.render("form_livros");
})
app.post("/cadastrarLivro", (req, res) => {
    let livro = new Livros();
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.isbn = req.body.isbn;
    livro.editora = req.body.editora;
    livro.volume = req.body.volume;

    livro.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar livro")
        res.redirect("/livros");
    })
})
app.get("/deletarLivro/:id", (req, res) => {
    var chave = req.params.id;
    Livros.deleteOne({ _id: chave }, (err, result) => {
        if (err)
            return res.status(500).send("Erro ao excluir registro")
        res.redirect("/livros")
    })
})
app.get("/editarLivro/:id", (req, res) => {
    var id = req.params.id;
    Livros.findById(id, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");
        res.render("form_editar", { livro: livro })
    });
});
app.post("/editarLivro", (req, res) => {
    var id = req.body.id;
    Livros.findById(id, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");
        livro.titulo = req.body.titulo;
        livro.autor = req.body.autor;
        livro.isbn = req.body.isbn;
        livro.editora = req.body.editora;
        livro.volume = req.body.volume;

        if(estado == 5){
            livro.save(err => {
                if (err)
                    return res.status(500).send("Erro ao salvar alterações");
                res.redirect("/livros");
            })
        }
    });
});
app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});

