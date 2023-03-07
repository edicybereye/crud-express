const env = require('../../env');

const mysql_database = require('./mysql_jurusan');
const redis_server = require('./redis_jurusan');

const http = require('http');
const hostname = '127.0.0.1';

const server = http.createServer(httpHandler);


server.listen(env.port, hostname, () => {
    console.log(`Server running at http://${hostname}:${env.port}/`);
});


function httpHandler(req, res) {

    const mysqlDatabase = new mysql_database();
    const redisServer = new redis_server();

    redisServer.getData((redisErr, redisResult) => {

        if (redisErr) {
            console.log(redisErr.message);
        } else {

            if (redisResult == null) {

                mysqlDatabase.getData((mysqlErr, mysqlResult) => {

                    jsonData = JSON.stringify(mysqlResult, null, 4)
                    redisServer.setData(jsonData);

                    var countries = { _source: 'MySQL Server', data: JSON.parse(jsonData) };

                    res.write(JSON.stringify(countries, null, 4));
                    res.end();
                });

            } else {

                var countries = { _source: 'Redis Server', data: JSON.parse(redisResult) };

                res.write(JSON.stringify(countries, null, 4));
                res.end();
            }
        }

    });


}
