var express = require('express');
var router = express.Router();
var fabricanteService = require('../../services/FabricanteService');

/* GET home page. */
router.get('/', function(req, res, next) {
	var fabricantes = [
        { nome: 'Bloody Mary', cnpj: 3333333333 },
        { nome: 'Martini', cnpj: 555554534543 },
        { nome: 'Scotch', cnpj: 10353535213565 }
    ];   
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
