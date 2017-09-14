var mysql = require('mysql');
var conecction = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'controleFabricantes'
}); 
module.exports=conecction;