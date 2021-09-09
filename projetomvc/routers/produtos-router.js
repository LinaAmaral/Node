var express = require("express"); 
const router = express.Router();
const produtoController = require("../controllers/produtos-controller");

router.get("/", produtoController.listar_produtos);
router.get("/cadastrarProdutos", produtoController.cadastrar_produtos_get);
router.post("/cadastrarProdutos", produtoController.cadastrar_produtos_post);
router.get("/deletarProduto/:id", produtoController.deletar_produtos);
router.get("/editarProduto/:id", produtoController.editar_produto_get);
router.post("/editarProduto", produtoController.editar_produto_post);

module.exports = router;