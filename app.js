var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	seedDb = require('./seed'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vms', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
require('dotenv').config();

app.listen('3000', function(req, res) {
	console.log('VMS server has started');
});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// seedDb();
app.use(require('./routes/resident'));
app.use(require('./routes/security'));

app.get('*', function(req, res) {
	res.send('404 Page Not Found');
});
