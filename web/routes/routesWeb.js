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
  res.render('index', {
        fabricantes: fabricantes
     });
});

router.get('/criarfabricante', function(req, res, next) {
	
  res.render('criarFabricante');
});

module.exports = router;
