/**
 * New node file
 */
exports.insert=function (req,res){
	var first_name=req.param('firstname');
	var last_name=req.param('lastname');
	var email=req.param('email');
	var password=req.param('password');
	var type=req.param('type');
	var street= req.param('street');
	var city=req.param('city');
	var state= req.param('state');
	var zipcode= req.param('zipcode');
	console.log("log2");
	console.log(first_name);
	console.log(last_name);
	console.log(email);
	console.log(password);
	var bal=0.00;
	var connPool = require('./dbConnectivity/mysqlConn').pool;
	connPool.getConnection(function (err, connection) {	
	var sql = "insert into users(first_name,last_name, email,password, type_of_user,balance, street,city,state,zipcode) values (?,?,?,?,?,?,?,?,?,?)";
	connection.query(sql, [first_name,last_name, email,password, type,bal,street,city,state,zipcode], function (err,rows,fields){
		if (err) {
            console.log("ERROR: " + err.message);
        }
		//console.log(results);
		res.render('index');
	});
	});
}