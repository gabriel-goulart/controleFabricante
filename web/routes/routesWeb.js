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

/* GET home page. */
router.get('/:idfabricante', function(req, res, next) {	
  	console.log(req.params.idfabricante);
	fabricanteService.getFabricanteIdGoogle(req.params.idfabricante,function(err, fabricantes){
  		if(!err){ console.log(fabricantes);
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
			
			res.redirect("/web");
		}else{
			
			res.redirect("/web");
		}
	});
});

router.post('/atualizarfabricante',function(req,res){
	fabricanteService.atualizarFabricante(req.body,function(err,row){
		if(!err){
			
			res.redirect("/web");
		}else{
			
			res.redirect("/web");
		}
	});
});

router.get('/produtos', function(req, res, next) {
  	fabricanteService.getProdutos(function(err,row){
  		if(!err){  			
  			var produtos = JSON.parse(row);  			
  			res.render('produtos', {
		        produtos: produtos['results']
		     });
  			
  		}else{
  			res.send('Produtos indisponiveis');
  		}
	});
  
});

router.get('/atualizarprodutos/:idfabricante', function(req, res, next) {
  	fabricanteService.getProdutos(function(err,row){
  		if(!err){  			
  			var produtos = JSON.parse(row);  			
  			fabricanteService.getFabricanteProdutos(req.params.idfabricante,function(err2,row2){
  				if(!err2){
  					var produto= produtos['results'];
  					for (var i =0 ; i < produto.length; i++) {
  						produto[i].selecionado = false;
  						for(var y=0; y < row2.length; y++){
  							if(produto[i].id == row2[y].idproduto)
  							{
  								produto[i].selecionado = true;
  								produto[i].preco = row2[y].preco;
  							}
  						}
  					}
  					console.log(produto);
  					res.render('produtos', {
				        produtos: produto
				     });
  				}else{
  					res.render('produtos', {
				        produtos: produtos['results'],
				        produtosSelecionados: []
				     });
  				}
  			})
  			
  		}else{
  			res.send('Produtos indisponiveis');
  		}
	});
  
});

router.get('/ativarfabricante/:op/:idfabricante', function(req,res, next){
	fabricanteService.ativarFabricante(req.params.op, req.params.idfabricante, function(err,row){
		res.redirect("/web");
	});
});

router.get('/mostrarfabricanteprodutos/:idfabricante', function(req,res, next){
	fabricanteService.getFabricanteProdutos(req.params.idfabricante,function(err,row){
		if(!err){
			console.log(row);
			var produtos = row;
			res.render('mostrarProdutos', {
		        produtos: produtos
		     });
		}
	});
});

router.get('/editarfabricante/:idfabricante', function(req,res, next){
	fabricanteService.getFabricante(req.params.idfabricante,function(err,row){
		if(!err){	
			console.log(row);				
			var fabricante =row;
			res.render('atualizarFabricante', {
		        fabricantes: fabricante
		     });
		}

	});
});

module.exports = router;
