var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/vendas?retryWrites=true&w=majority").then(() => {
    console.log("banco conectado")
}).catch((err) => {
    console.log("Deu ruim!" + err)
});
