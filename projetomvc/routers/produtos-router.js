var express = require("express"); 
const router = express.Router();
const produtoController = require("../controllers/produtos-controller");

router.get("/", produtoController.listar_produtos);


module.exports = router;