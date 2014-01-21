var express = require('express'),
	path = require('path'),
	app = express( );

app.configure(function(){
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

function generateIpsum ( amount, size, _words ) {
	var groups = [];
	_words = _words || words;
	size = size ? sizes[size] : 20;

	for ( var i = 0; i < amount; i += 1 ) {
		var paragraph = "";
		for ( var x = 0; x < size; x += 1) {
			var dword = doge[(Math.round(Math.random() * 3))],
				wword = _words[(Math.round(Math.random() * (_words.length - 1) ))];

				if ( Math.round(Math.random() * 1) && x !==0 ){
					paragraph += "<br>";
				}

				for( var y = 0; y < Math.round(Math.random() * 4); y += 1 ){
					paragraph += "&nbsp;&nbsp;&nbsp;&nbsp;";
				}

				paragraph += dword + " " + wword + ". ";

		}
		groups.push(paragraph);
	}
	return groups;
}

var doge = [
		"wow",
		"such",
		"so",
		"very"
	],
	sizes = {
		"large" : 50,
		"medium" : 25,
		"small" : 20
	},
 	words = [
 		"codeday",
 		"hax",
 		"donuts",
 		"sloths",
 		"go",
 		"web",
 		"projector",
 		"pizza",
 		"gmo apples",
 		"magik",
 		"gasp",
 		"omg",
 		"trayansaursus",
 		"apple piez"
 	];

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/paragraphs.json', function( req, res ){
	var payload = req.query,
		amount = payload.amount || 1,
		_words = payload.words ? payload.words.split(/\,/) : null ,
		size = payload.size,
		results = generateIpsum( +amount, size, _words );

	res.json({
		paragraphs : results
	});
});

app.listen( process.env.PORT || 3000 );