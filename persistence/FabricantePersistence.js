var db = require('./mysql_connect');

exports.createFabricante = function(nome,cnpj,callback)
{
	return db.query("insert into fabricantes (idgoogle,nome,cnpj,ativo) values(1,?,?,1)",[nome,cnpj],callback);

}

exports.createFabricanteProduto = function(idfabricante,idproduto,preco,callback){
	db.query("DELETE FROM fabricantesProdutos where idfabricante = ?",idfabricante,function(err,row){
		if(!err)
			return db.query("insert into fabricantesProdutos (idfabricante,idproduto,preco) values(?,?,?)",[idfabricante,idproduto,preco],callback);
	});
}

exports.atualizarFabricante=function(idfabricante,nome,cnpj, callback){
	return db.query("UPDATE fabricantes SET nome = ? , cnpj = ? WHERE idfabricante = ?",[nome,cnpj,idfabricante],callback);
}
exports.getFabricanteProdutos=function(idFabricante, callback){
	return db.query("select p.nome nomeproduto, p.descricao,fp.* from fabricantesProdutos fp inner join fabricantes f on f.idfabricante = fp.idfabricante inner join produtos p on p.idproduto = fp.idproduto where fp.idfabricante = ?",idFabricante,callback);

}

exports.getTodosFabricantes=function(callback){

	//return db.query("select f.* , group_concat('{ \"idproduto\":',fp.idproduto,',','\"nome\":','\"',fp.nome,'\"',',','\"descricao\":','\"',fp.descricao,'\"',',','\"preco\":','\"',fp.preco,'\"}') as produto from fabricantes f left join (select ftp.preco, ftp.idfabricante, p.* from fabricantesProdutos ftp inner join produtos p on ftp.idproduto = p.idproduto) fp on fp.idfabricante = f.idfabricante",callback);
	return db.query("select f.idfabricante,f.nome nomeFabricante ,f.cnpj,f.ativo estado,fp.idproduto, fp.nome nomeProduto, fp.descricao, fp.preco, fp.ativo from fabricantes f inner join (select ftp.preco, ftp.idfabricante, p.* from fabricantesProdutos ftp inner join produtos p on ftp.idproduto = p.idproduto) fp on fp.idfabricante = f.idfabricante order by f.idfabricante asc",callback);

}

exports.getFabricante=function(idfabricante, callback){
	return db.query("select * from fabricantes where idfabricante = ?",idfabricante,callback);
}

exports.getFabricanteIdGoogle=function(idfabricante, callback){
	return db.query("select * from fabricantes where idgoogle like ?",idfabricante,callback);
}
exports.getfabricantesList=function(callback){
	return db.query("select * from fabricantes", callback);
}

exports.ativarFabricante=function(op, idfabricante, callback){
	return db.query("UPDATE fabricantes SET ativo = ? WHERE idfabricante = ?",[op,idfabricante],callback);
}

exports.insertProdutos=function(info,callback){
	return db.query(info,callback);
}

exports.cadastrarFabricante = function(id,nome,cnpj,callback){
	return db.query("insert into fabricantes (idgoogle,nome,cnpj,ativo) values(?,?,?,1)",[id,nome,cnpj],callback);
}

