class redis_server {

    redisConnect() {

        const redis = require('redis');

        const redisClient = redis.createClient('127.0.0.1', 6379);

        redisClient.connect();

        redisClient.on('error', err => {
            console.log('Error ' + err);
        });

        return redisClient;
    }

    setData(data) {
        var redisClient = this.redisConnect();
        redisClient.set('majors', data);
    }

    getData(callBack) {
        var redisClient = this.redisConnect();
        var resp = redisClient.get('majors');

        resp.then(function(result) {
            callBack(null, result)
        });
    }
}

module.exports = redis_server;