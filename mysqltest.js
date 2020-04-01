var mysql = require('mysql');
//var config = require('./config.json');

var pool  = mysql.createPool({
    host     : 'mysql5-7freetier.c2tskthlfglu.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'Welcome9',
    database : 3306
  });

exports.handler =  (event, context, callback) => {
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * FROM contacts', function (error, results, fields) {
      // And done with the connection.
      if(results.length > 0){
        let result = results[0].email + ' ' + results[0].firstname + ' ' + results[0].lastname;
        console.log(result);
    }


      connection.release();
      // Handle error after the release.
      if (error) callback(error);
      else callback(null,results[0].email);

    });
  });
};