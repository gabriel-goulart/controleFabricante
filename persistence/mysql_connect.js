var mysql = require('mysql');
var conecction = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '795134',
	database: 'seatbooking'
});

module.exports=conecction;