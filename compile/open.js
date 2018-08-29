var open = require("open")
var config = require('./getConfig')()
setTimeout(function () {
    open("http://127.0.0.1:" + config.serverPort)
}, 500)
