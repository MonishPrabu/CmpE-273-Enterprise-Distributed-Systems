/**
 * New node file
 */
exports.fetchdata=function(req,res){
	var connPool = require('./dbConnectivity/mysqlConn').pool;
	console.log("log1");
	connPool.getConnection(function (err, connection) {
		var username=req.param('username');
		var password=req.param('password');
		var sql1= "SELECT * FROM admin WHERE username=? and password=?";
		//connection.connect();
		connection.query(sql1, [username, password], function(err, rows,fields) {
			console.log("Rows :: "+JSON.stringify(rows));
			if (rows.length!==0) {
				req.session.admin_fname = rows[0].username;
				console.log("Row objects:: "+JSON.stringify(rows));
				res.render('admin_home',{
					admin_fname: req.session.admin_fname
				});
			}

			else{

				//callback(err,"error");
				console.log("error" +err);

			}
		});
	});
};
exports.logout=function(req,res){

	req.session = null;
	res.render('index');
};