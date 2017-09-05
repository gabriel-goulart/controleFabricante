var db = require('./mysql_connect');

exports.createFabricante = function(fornecedorInfo,callback)
{
	return db.query("insert into Reserva (data,idusuario,idviagem,idassento,idreserva_periodica) values(str_to_date(?,'%d-%m-%Y'),?,?,?,?)",[bookingInfo.data,bookingInfo.idusuario,bookingInfo.idviagem,bookingInfo.idassento,bookingInfo.idreservaperiodica],callback);

}