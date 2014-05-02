/**
 * New node file
 */
exports.fetchdata=function(req,res){
	var connPool = require('./dbConnectivity/mysqlConn').pool;
	console.log("log1");
	connPool.getConnection(function (err, connection) {
			//console.log("username" + username + "password: " + password);
		var username=req.param('username');
		var password=req.param('password');
		var sql1= "SELECT * FROM admin WHERE username=? and password=?";
		//connection.connect();
		connection.query(sql1, [username, password], function(err, rows,fields) {
			console.log("Rows :: "+JSON.stringify(rows));
			if (rows.length!==0) {
				console.log("Row objects:: "+JSON.stringify(rows));
				//callback(err,rows);
				res.render('validatedadmin');
			}
		       
			else{
	
				//callback(err,"error");
				console.log("error" +err);
				
			}
	});
	});
	
	
	
	
}