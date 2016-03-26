var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack-admin/dev.config');

var app = new (require('express'))();
var port = 3001;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  reload: true,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' } }));
app.use(webpackHotMiddleware(compiler));

app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/public/index.admin.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
