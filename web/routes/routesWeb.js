var express = require('express');
var router = express.Router();
var fabricanteService = require('../../services/FabricanteService');

/* GET home page. */
router.get('/', function(req, res, next) {	
  fabricanteService.getfabricantesList(function(err, fabricantes){
  		if(!err){
  			res.render('index', {
		        fabricantes: fabricantes
		     });
  		}else{
  			res.send("Sistema Indisponivel no momento");
  		}
  });
  
});

router.get('/criarfabricante', function(req, res, next) {
	
  res.render('criarFabricante');
});

router.post('/criarfabricante',function(req,res){
	fabricanteService.createFabricante(req.body,function(err,row){
		if(!err){
			
			res.redirect("/");
		}else{
			
			res.redirect("/");
		}
	});
});

router.get('/produtos', function(req, res, next) {
  	fabricanteService.getProdutos(function(err,row){
  		if(!err){  			
  			produtos = JSON.parse(row);  			
  			res.render('produtos', {
		        produtos: produtos['results']
		     });
  			
  		}else{
  			res.send('Produtos indisponiveis');
  		}
	});
  
});
module.exports = router;
