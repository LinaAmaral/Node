const Alunos = require("../models/alunos-model.js")

exports.listar_alunos = (req, res) => {
    Alunos.find({}, (err, alunos) => {
        if (err)
            return res.status(500).send("Erro ao consultar o banco");
        res.render("views/pages/alunos", { itens: alunos });
    });
}

exports.cadastrar_aluno_get = (req, res) => {
    res.render("views/pages/formAluno");
};
exports.cadastrar_aluno_post = (req, res) => {
    let aluno = new Alunos();
    aluno.nome = req.body.nome
    aluno.data_nascimento = req.body.data_nascimento
    aluno.turma = req.body.turma
    aluno.matricula = req.body.matricula

    aluno.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar aluno")
        res.redirect("/alunos");
    })
};
exports.deletar_aluno = (req, res) => {
    var chave = req.params.id;
    Alunos.deleteOne({ _id: chave }, (err, result) => {
        if (err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/alunos")
    })
}

exports.editar_aluno_get = (req, res) => {
    let id = req.params.id;
    Alunos.findById(id, (err, aluno) => {
        console.log(aluno)
        if (err)
            return res.status(500).send("Erro ao conectar ao banco de dados");
        res.render("views/pages/formEditarAlunos", { item: aluno })
    });
}

exports.editar_aluno_post = (req, res) => {
    let id = req.body.id;
    Alunos.findById(id, (err, aluno) => {
        if (err)
            return res.status(500).send("Erro ao conectar ao banco de dados");
        aluno.nome = req.body.nome;
        aluno.data_nascimento = req.body.data_nascimento;
        aluno.turma = req.body.turma;
        aluno.matricula = req.body.matricula

        aluno.save(err => {
            if (err)
                return res.status(500).send("Erro ao salvar alterações");
            res.redirect("/alunos");
        });
    });
}