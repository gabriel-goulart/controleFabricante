var request = require('request');
var fabricante_persistencia = require('../persistence/FabricantePersistence');

exports.createFabricante= function(info, callback){
	fabricante_persistencia.createFabricante(info.nome,info.cnpj, function(err,row){
		if(!err){
			console.log("Fabricante adicionado");
			console.log("id inserido : " + row.insertId);			
			if (info.produtoSelecionado){
				console.log(info.produtoSelecionado.length);
				console.log(info.produtoSelecionadoValor);
				var produtoValor = [];
				for (var y = 0; y < info.produtoSelecionadoValor.length; y++) {
					if(info.produtoSelecionadoValor[y] != ""){
						produtoValor.push(info.produtoSelecionadoValor[y]);
					}
					
				}
				for (var i = 0; i < info.produtoSelecionado.length; i++) {
							
					console.log(produtoValor);
					fabricante_persistencia.createFabricanteProduto(row.insertId,info.produtoSelecionado[i],produtoValor[i],function(err, row1){
						if(!err){
							console.log("produto adicionado");
						}else{
							console.log("produto não adicionado");
						}
					});									
				}
			}
			return callback(false,row);	
		}else{
			console.log("Fabricante não adicionado");
			return callback(true,null);
		}
	});	
		
	
}

exports.getTodosFabricantes=function(callback){
	fabricante_persistencia.getTodosFabricantes(function(err,row){
		if(!err){
			jsonRetorno = "[";
			for (var i = 0; i < row.length; i++) {
				console.log(i);
				if(i != 0){
					if(row[i].idfabricante == row[i-1].idfabricante){
						jsonRetorno += ",{" + "\"id\":" + row[i].idproduto + ", \"nome\": \""+row[i].nomeProduto+"\" , \"descricao\":\""+row[i].descricao+"\" , \"habilitado\":\""+row[i].ativo+"\", \"preco\":\""+row[i].preco+"\"}"; 
					}else{
						jsonRetorno += "]}";
						jsonRetorno += ",{ \"idFabricante\":"+row[i].idfabricante + ", \"nome\": \"" +row[i].nomeFabricante+"\", \"cnpj\":\" "+ row[i].cnpj + "\" , \"ativo\":"+row[i].ativo; 
						jsonRetorno += ", \"produtos\":[";
						if(row[i].idproduto != null){
							jsonRetorno += "{" + "\"id\":" + row[i].idproduto + ", \"nome\": \""+row[i].nomeProduto+"\" , \"descricao\":\""+row[i].descricao+"\" , \"habilitado\":\""+row[i].ativo+"\", \"preco\":\""+row[i].preco+"\"}"; 
						}	
					}
				}else{
					jsonRetorno += "{ \"idFabricante\":"+row[i].idfabricante + ", \"nome\": \""+row[i].nomeFabricante+"\", \"cnpj\":\" "+ row[i].cnpj + "\" , \"ativo\":"+row[i].ativo; 
					jsonRetorno += ", \"produtos\":[";
					if(row[i].idproduto != null){
						jsonRetorno += "{" + "\"id\":" + row[i].idproduto + ", \"nome\": \""+row[i].nomeProduto+"\" , \"descricao\":\""+row[i].descricao+"\" , \"habilitado\":\""+row[i].ativo+"\", \"preco\":\""+row[i].preco+"\"}"; 
					}	
				}

				
				
				
			}
			 if(row[row.length-1].idproduto == null){
			 	jsonRetorno += "}]";
			 }else{
			 	jsonRetorno += "]}]";
			 }
			
			console.log(jsonRetorno);
			return callback(false,JSON.parse(jsonRetorno));
		}
	});
} 

exports.getfabricantesList=function(callback){
	return fabricante_persistencia.getfabricantesList(callback);
}	

exports.getFabricante=function(idFabricante){

}

exports.updateFabricante=function(idFabricante, info){

}

exports.deleteFabricante=function(idFabricante){

}

exports.getProdutos=function(callback){
	
	request('http://20.11.12.50:3000/api/produtos',{timeout:1500},function(erro,response,body){
				//console.log(JSON.parse(body));
				//var info = JSON.parse(body);
				//console.log(info.results[0].address_components[3].long_name);
				return callback(erro,body);
				//return  getCity(info.results[0].address_components[3].long_name,callback);
		}); 
}

exports.getFabricanteProdutos=function(idFabricante,indice, callback){
	fabricante_persistencia.getFabricanteProdutos(idFabricante,function(err,row){
		return callback(err,row,indice);
	});
}

exports.ativarFabricante=function(op,idfabricante,callback){
	fabricante_persistencia.ativarFabricante(op,idfabricante,function(err,row){
		return callback(err,row);
	});
}