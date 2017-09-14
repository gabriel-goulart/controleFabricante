var request = require('request');
var fabricante_persistencia = require('../persistence/FabricantePersistence');

exports.createFabricante= function(info, callback){
		console.log(info.produtoSelecionado.length);
		console.log(info.produtoSelecionadoValor[5]);
	for (var i = 0; i < info.produtoSelecionado.length; i++) {
		var val = parseInt(info.produtoSelecionado[i]);
		console.log(val);
		console.log(info.produtoSelecionado[i]);
		
	}
	return callback(false,null);
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
						jsonRetorno += ",{ \"idFabricante\":"+row[i].idfabricante + ", \"nome\": \"" +row[i].nomeFabricante+"\", \"cnpj\":\" "+ row[i].cnpj + "\""; 
						jsonRetorno += ", \"produtos\":[";
						if(row[i].idproduto != null){
							jsonRetorno += "{" + "\"id\":" + row[i].idproduto + ", \"nome\": \""+row[i].nomeProduto+"\" , \"descricao\":\""+row[i].descricao+"\" , \"habilitado\":\""+row[i].ativo+"\", \"preco\":\""+row[i].preco+"\"}"; 
						}	
					}
				}else{
					jsonRetorno += "{ \"idFabricante\":"+row[i].idfabricante + ", \"nome\": \""+row[i].nomeFabricante+"\", \"cnpj\":\" "+ row[i].cnpj + "\""; 
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
/*
exports.getTodosFabricantes=function(callback){
	return fabricante_persistencia.getTodosFabricantes(callback);
}	*/

exports.getFabricante=function(idFabricante){

}

exports.updateFabricante=function(idFabricante, info){

}

exports.deleteFabricante=function(idFabricante){

}

exports.getProdutos=function(callback){
	console.log('aqui');
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
