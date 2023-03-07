class mysql_database {

    getData(callBack) {

        const mysql = require('mysql');

        const mysql_con = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
         });

        mysql_con.connect(function(err) {
            if (err) {
                console.log(err.message);
            }
        });

       var queryString = "select * from majors";

       mysql_con.query(queryString , [], function (err, result) {
           if (err) {
               callBack(err, null);
           } else {
               callBack(null, result);
           }
      });

    }
}

module.exports = mysql_database;