var bunyan = require("bunyan");
var splunkBunyan = require("splunk-bunyan-logger");

module.exports = {
    // Define the payload to send to HTTP Event Collector
    logger: (request) => {


        var config = {
            token: "591bf120-0127-495b-8653-7a84779dea40",
            url: "http://localhost:8088"
        };

        var splunkStream = splunkBunyan.createStream(config);

        var Logger = bunyan.createLogger({
            name: "my logger",
            streams: [
                splunkStream
            ]
        });

        // Define the payload to send to HTTP Event Collector
        var payload = {
            // Our important fields
            ...request,

            // Special keys to specify metadata for HTTP Event Collector
            source: "dev",
            sourcetype: "httpevent",
            index: "main",
            host: "localhost"
        };

        /**
         * Since maxBatchCount is set to 1 by default, calling send
         * will immediately send the payload.
         * 
         * The underlying HTTP POST request is made to
         *
         *     https://localhost:8088/services/collector/event/1.0
         *
         * with the following body
         *
         *     {
         *         "source": "chicken coop",
         *         "sourcetype": "httpevent",
         *         "index": "main",
         *         "host": "farm.local",
         *         "event": {
         *             "message": {
         *                 "chickenCount": 500
         *                 "msg": "Chicken coup looks stable.",
         *                 "name": "my logger",
         *                 "put": 98884,
         *                 "temperature": "70F",
         *                 "v": 0
         *             },
         *             "severity": "info"
         *         }
         *     }
         *
         */
        console.log("Sending payload", payload);
        Logger.info(payload);

    }

}
