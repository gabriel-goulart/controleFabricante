var db = require('./mysql_connect');

exports.createFabricante = function(fornecedorInfo,callback)
{
	return db.query("insert into Reserva (data,idusuario,idviagem,idassento,idreserva_periodica) values(str_to_date(?,'%d-%m-%Y'),?,?,?,?)",[bookingInfo.data,bookingInfo.idusuario,bookingInfo.idviagem,bookingInfo.idassento,bookingInfo.idreservaperiodica],callback);

}

exports.getFabricanteProdutos=function(idFabricante, callback){
	return db.query("select p.nome nomeProduto,fp.* from fabricantesProdutos fp inner join fabricantes f on f.idfabricante = fp.idfabricante inner join produtos p on p.idproduto = fp.idproduto where fp.idfabricante = ?",idFabricante,callback);

}

exports.getTodosFabricantes=function(callback){

	//return db.query("select f.* , group_concat('{ \"idproduto\":',fp.idproduto,',','\"nome\":','\"',fp.nome,'\"',',','\"descricao\":','\"',fp.descricao,'\"',',','\"preco\":','\"',fp.preco,'\"}') as produto from fabricantes f left join (select ftp.preco, ftp.idfabricante, p.* from fabricantesProdutos ftp inner join produtos p on ftp.idproduto = p.idproduto) fp on fp.idfabricante = f.idfabricante",callback);
	return db.query("select f.idfabricante,f.nome nomeFabricante ,f.cnpj,fp.idproduto, fp.nome nomeProduto, fp.descricao, fp.preco, fp.ativo habilitado from fabricantes f inner join (select ftp.preco, ftp.idfabricante, p.* from fabricantesProdutos ftp inner join produtos p on ftp.idproduto = p.idproduto) fp on fp.idfabricante = f.idfabricante order by f.idfabricante asc",callback);

}


