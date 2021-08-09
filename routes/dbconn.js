// // mssql 연동
// const sql = require('mssql');
// const config = {
// 	user: 'sa',
// 	password: '@ngAngNas2l3',
// 	server: '10.10.0.241',
// 	port : parseInt('1433'),
// 	database: 'Hiitc',
// 	options: {
// 		encrypt: false,
// 		enableArithAbort: true
// 	},
// 	pool: {
// 		max: 5,
// 		min: 1,
// 		idleTimeoutMillis: 30000,
// 	},
// }

// const pollPromise = new sql.ConnectionPool(config)
// 	.connect()
// 	.then((pool) => {
// 		console.log('Connected to MSSQL');
// 		return pool;
// 	})
// 	.catch((err) => console.log('Connect Failed : ', err));

// module.exports = {
// 	sql,
// 	pollPromise,
// }

var sql = require('mssql');
var dbConfig = {
	user: 'sa',
	password: '@ngAngNas2l3',
	server: '10.10.0.241',
	port: parseInt('1433'),
	database: 'Hiitc',
	options: {
		encrypt: false,
		enableArithAbort: true
	},
	pool: {
		max: 5,
		min: 1,
		idleTimeoutMillis: 30000,
	},
};

exports.getData = function(query){
	var conn = new sql.Connection(dbConfig);
	conn.Connection().then(function(){
		var req = new sql.Request(conn);
		req.query(query).then(function(recordset){
			console.log(recordset);
		}).catch(function(err){
			console.log(err);
		});
	}).catch(function(err){
		console.log(err);
	});

	conn.close();
};


exports.connect = function(){
	sql.connect(dbConfig, function(err){
		if(err){
			console.log("Err connecting : " + err);
		}
		else{
			console.log('Connect Server');
		}
	});

	process.on('SIGINT', function(){
		console.log('disconnected');
		process.exit(0);
	});
};

exports.execute = function(query, callback){
	var request = new sql.Request();
	request.query(query, function(err, result, fields){
		if(err){
			console.log('query error : ' + err);
		}
		else{
			return callback(result);
		}
	});
};