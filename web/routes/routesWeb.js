var express = require('express');
var router = express.Router();
var fabricanteService = require('../services/fabricanteService');

/* GET home page. */
router.get('/', function(req, res, next) {
	var fabricantes = [
        { nome: 'Bloody Mary', cnpj: 3333333333 },
        { nome: 'Martini', cnpj: 555554534543 },
        { nome: 'Scotch', cnpj: 10353535213565 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('index', {
        fabricantes: fabricantes
     });
});

router.get('/criarfabricante', function(req, res, next) {
	
  res.render('criarFabricante');
});

module.exports = router;
