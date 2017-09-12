var mysql = require('mysql');
var conecction = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'controlefornecedor'
});

module.exports=conecction;