var mongoose = require("mongoose");

const Produtos = mongoose.model("produtos",{
    nome:String,
    vlUnit: Number,
    codigoBarras: String,
})

module.exports = Produtos;