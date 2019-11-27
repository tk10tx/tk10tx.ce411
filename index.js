var express = require('express');
var userRoute = require('./routes/user.route');

var app = express(); 
var port = 8031;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(req, res){
	res.render('indexx');
});

app.use('/users', userRoute);

app.get('/styles/custom', function(req, res){
	res.send('abc');
});
app.listen(port, function(){
	console.log('Server listening on port: '+ port)
});