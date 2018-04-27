var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// ******** Connection pool code start ********
var pool = mysql.createPool({
        connectionLimit : 50,
        host     : 'mysql.ca9j02g2avzs.us-west-1.rds.amazonaws.com',
        user     : 'root',
        password : 'password123',
        database : 'fandango',
        port	 : 3306
    });


exports.fetchData = (callback, query) => {
    console.log("MySQL SELECT QUERY: " + query);
    pool.getConnection((err, connection) => {
        connection.query(query, function(err, rows, fields) {
            if(err) {
                console.log("ERROR: " + err.message);
            } else {
              console.dir("Results: " + JSON.stringify(rows));
            }
            callback(err, rows);
        });
      connection.release();
      console.log("Connection released");
  });
}

exports.insertData = (callback, query) => {
	  console.log("MySQL INSERT QUERY: " + query);
  	pool.getConnection( (error, connection) => {
    		connection.query(query, function(err, result) {
      			if(err) {
      				  console.log("ERROR: " + err.message);
      			} else {
        				console.log("Results: \n" + JSON.stringify(result));
                console.log("The inserted id is: " + result.insertId);
      			}
            callback(err, result);
    		});
        connection.release();
        console.log("Connection released");
  	});
}

// ******** Connection pool code end ********

// ******** Regular connection code start ********

// var connection = mysql.createConnection({
//     host     : 'mysql.ca9j02g2avzs.us-west-1.rds.amazonaws.com',
//     user     : 'root',
//     password : 'password123',
//     database : 'fandango',
//     port	   : 3306
// });
//
// exports.fetchData = (callback, query) => {
//     console.log("RUNNING MySQL SELECT QUERY THROUGH REGULAR CONNECTION: " + query);
//     connection.query(query, function (err, result, fields) {
//       if (err) {
//         console.log("ERROR: " + err.message);
//         throw err;
//       }
//       console.log("Results: \n" + JSON.stringify(result));
//       callback(err, result);
//     });
//     console.log("End connection");
//     connection.end();
// }
//
// exports.insertData = (callback, query) => {
// 	  console.log("RUNNING MySQL INSERT QUERY THROUGH REGULAR CONNECTION: " + query);
//     connection.query(query, function (err, result) {
//       if (err) {
//         console.log("ERROR: " + err.message);
//         throw err;
//       }
//       console.log("Results: \n" + JSON.stringify(result));
//       console.log("The inserted id is: " + result.insertId);
//       callback(err, result);
//     });
//     console.log("End connection");
//     connection.end();
// }

// ******** Regular connection code end ********

console.log("Connected to mysql ... :) ");

// DO NOT USE
// function fetchData(callback,sqlQuery){
//
//     console.log("\nSQL Query::"+sqlQuery);
//
//     var pool = getConnection();
//
//     pool.getConnection(function(err, connection){
//         if(err){
//             console.log("ERROR: "+err.message);
//             return;
//         }
//         connection.query(sqlQuery,function(error, results, fields) {
//             if (error) {
//                 console.log("ERROR: " + error.message);
//             }
//             else{
//                 console.log("DB results : ",results);
//             }
//             callback(err, results);
//             console.log("\nConnection closed..");
//         });
//
//     });
// }
//
// exports.fetchData=fetchData;
