var mongoose = require("mongoose");

const Alunos = mongoose.model("alunos",{
    nome: String,
    data_nascimento: String,
    turma: String,
    matricula: Number
})

module.exports = Alunos;