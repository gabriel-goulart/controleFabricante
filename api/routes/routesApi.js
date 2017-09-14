var express = require('express');
var router = express.Router();
var fabricanteService = require('../../services/FabricanteService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/produtos', function(req, res, next) {
  res.json({
    "count": 4,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "nome": "Colchão",
            "descricao": "bla bla bla",
            "habilitado": true
        },
        {
            "id": 2,
            "nome": "Livro",
            "descricao": "bla bla bla bla",
            "habilitado": true
        },
        {
            "id": 3,
            "nome": "Cadeira",
            "descricao": "pra sentar",
            "habilitado": true
        },
        {
            "id": 4,
            "nome": "Mesa de centro",
            "descricao": "contar o dinheiro",
            "habilitado": true
        }
    ]
	});
});

router.get('/fabricantes', function(req, res, next) {
  fabricanteService.getTodosFabricantes(function(err,fabricantes){	  	
	  	if(!err){
	  		res.json(fabricantes);
	  	} else{
	  		res.json({erro: err});
	  	} 	
	});
});

router.get('/produtosFabricante/:id', function(req,res,next){
	fabricanteService.getFabricanteProdutos(req.params.id,function(err,produtos){
	  			res.json(produtos);
	 });
});
module.exports = router;
