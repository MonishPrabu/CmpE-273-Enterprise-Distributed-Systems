/*
 * To handle movie details.
 * GET - Show specific movie details,
 * POST - Update movie, Delete movie, and Add to cart.
 */

exports.show = function(req, res) {
	var query = require('./dbConnectivity/mysqlQuery');
	var product;
	var sqlStmt = "select movie_id as m_id, movie_name as m_name, movie_banner as banner, release_date, rent_amount, category, available_copies as quantity from movies where movie_id=? and is_Published = true";
	console.log(req.param('m_id'));
	var params = [req.param('m_id')];
	query.execQuery(sqlStmt, params, function(err, rows) {
		if(rows.length !== 0) {
			try {
				var movie = [];
				var mQty;
				if (rows[0].quantity <= 0) {
					mQty = 'Sold Out';
					console.log('>> Following movie is out of stock: '+ rows[0].m_id);
				}
				movie[0] = {
						m_id : rows[0].m_id,
						m_name : rows[0].m_name,
						banner : rows[0].banner,
						release_date : rows[0].release_date,
						rent_amount : rows[0].rent_amount,
						category : rows[0].category,
						quantity : rows[0].quantity
				};
				console.log(movie[0].m_name);
				res.render('movie-details', { title: rows[0].m_name, layout:false,	locals: { username : req.session.username, movie : movie, errorMessage: ""}});
			} catch (e) {
				console.log('Error>>'+e.message);
				res.status = 500;
				res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
			}
		} else {
			res.status = 500;
			res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
		}
	});
};
exports.update = function (req, res) {
	var query = require('./dbConnectivity/mysqlQuery');
	var product;
	var sqlStmt = "update movies set movie_name = ?," +
	" movie_banner = ?," +
	" release_date = ?," +
	" rent_amount = ?," +
	" category = ?," +
	" available_copies = ?" +
	" where movie_id = ?";
	console.log("movie id to be updated->"+req.param('m_id'));
	var params = [req.param('m_name'), req.param('banner'), req.param('release_date'), req.param('rent_amount'), req.param('category'), req.param('quantity'), req.param('m_id')];
	query.execQuery(sqlStmt, params, function(err, rows) {
		try {
			console.log(rows.length );
			if(rows.length !== 0) {
				res.redirect(req.get('referer'));
			} else {
				res.status = 500;
				res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
			}
		} catch (e) {
			console.log('Error>>'+e.message);
			res.status = 500;
			res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
		}
	});
};

exports.unPublish = function (req, res) {
	var query = require('./dbConnectivity/mysqlQuery');
	var product;
	var sqlStmt = "update movies set" +
	" is_published = ?" +
	" where movie_id = ?";
	console.log("movie id to be deleted->"+req.param('m_id'));
	var params = [req.param('is_published'), req.param('m_id')];
	query.execQuery(sqlStmt, params, function(err, rows) {
		try {
			console.log(rows.length );
			if(rows.length !== 0) {
				res.redirect(req.get('referer'));
			} else {
				res.status = 500;
				res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
			}
		} catch (e) {
			console.log('Error>>'+e.message);
			res.status = 500;
			res.render('index', { titile: 'VLM', layout:false, locals: { username: req.session.username, message: 'Sorry! Something went wrong'}});
		}
	});
};

/*
 * 
	var query = require('./dbConnectivity/mysqlQuery');
	//connection.escape(userId) to avoid SQL Injection attacks
	var sqlStmt = "select count(*) as isValidLogin, last_login_ts as lastLoginTS from login_detail where user_id=? and password=?";
	var isLoggedIn = false;
	var lastLoginTS = null;
	var params = [req.param('email'), req.param('password')];
	query.execQuery(sqlStmt, params, function(err, rows) {
		console.log(rows);
		if(rows.length !== 0) {
			if (rows[0].isValidLogin === 1) {
				lastLoginTS = rows[0].lastLoginTS;
				req.session.username = req.param('email');
				req.session.isLoggedin = true;
				var backURL=req.header('Referer') || '/';
				console.log(backURL);
				if (backURL.indexOf('login', 0) === -1 && backURL.indexOf('register', 0) === -1) {
					res.statusCode = 302;
					res.redirect(backURL);
				} else {
					res.render('index', { titile: 'A2Z', layout:false, locals: { username: req.session.username, message: lastLoginTS}});
					sqlStmt = 'update login_detail set last_login_ts = ? where user_id = ?';
					params = [new Date(), req.param('email')];
					query.execQuery(sqlStmt, params, function(err, rows) {
						if (err) {
							console.log('Error in logging the time stamp');
						}
					});
				}
				isLoggedIn = true;
			} else {
				res.render('login', { title: 'Login', layout:false, locals: { errorMessage: "Invalid Login. Try again."}});
			}
		}
	});
 */
/*exports.registerCustomer = function (req, res) {
	var query = require('./dbConnectivity/mysqlQuery');
	//connection.escape(userId) to avoid SQL Injection attacks
	var sqlStmt = "insert into login_detail values(?,?,?,?,null)";
	var params = [req.param('fName'), req.param('lName'), req.param('email'), req.param('password')];
	query.execQuery(sqlStmt, params, function(err, rows) {
		if (!err) {
			console.log("DATA : "+JSON.stringify(rows));
			if(rows.length !== 0){
				res.render('login', { title: 'Login', layout:false, locals: { errorMessage: ""}});
			}
		} else {
			console.log("Error executing query");
			res.status = 500;
			res.render('register', {title: 'Register', layout:false, locals: { errorMessage: "Problem in registeration. Please try again with correct values!"}});
		}
	});
};
 */