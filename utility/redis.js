const redis = require("redis");
var rediscl = redis.createClient();
rediscl.on("connect", function () {
    console.log("Redis plugged in.");
});
module.exports = () => {

    return rediscl;
}