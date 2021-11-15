const createError = require('http-errors'),
  express = require('express'),
  bodyParser = require("body-parser"),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  config = require('./configuration'),
  db = require('./database'),
  cors = require('cors'),
  registerRoutes = require("./routes/index"),
  splunk = require("./utility/splunkLogger"),
  redis = require("./utility/redis")
  client = require('prom-client');
var app = express();
var port = 8081;

redis();

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

splunk.logger({ "app": "app started" });

// enable prom-client to expose default application metrics
const collectDefaultMetrics = client.collectDefaultMetrics;

// define a custom prefix string for application metrics
collectDefaultMetrics({ prefix: 'node_devops:' });

// a custom histogram metric which represents the latency
// of each call to our API /api/greeting.
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'node_devops:http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method','path', 'status_code'],
  buckets: [0.1, 1, 2, 5, 10]
});

const counter = new client.Counter({
  name: 'node_devops:node_request_opertions_total',
  help: 'Total no of processed requests',
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now()
  counter.inc();
  next()
})


app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch
  httpRequestDurationMicroseconds
    .labels(req.method, req.originalUrl, res.statusCode)
    .observe(responseTimeInMs)

  next()
})

app.use(registerRoutes);


// expose our metrics at the default URL for Prometheus
app.get('/metrics', (request, response) => {
  response.set('Content-Type', client.register.contentType);
  response.send(client.register.metrics());
});



// start the server
app.listen(port, function () {
  console.log('app started');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
