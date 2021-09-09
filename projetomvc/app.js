var express = require("express");
var mongoose = require("mongoose");
const app = express();
const porta = 3000;

mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/vendas?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const produto_router = require("./routers/produtos-router")
app.use("/produtos", produto_router)

app.get("/", (req, res) => {
    res.send("página principal");
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta)
});

