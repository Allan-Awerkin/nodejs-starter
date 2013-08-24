var plants = require('../model/plants');

exports.page = function(req, res) {
	var params = req.query;
	var	sort = params.sort || 'name',
		page = parseInt(params.page || 1),
		pagesize = parseInt(params.pagesize || 5);
	var title = 'Plants database';
	console.log('Getting data');
	plants.summary(sort, page, pagesize,
		function (err, data) {
			pageparams = {
				'title'		: title + ' - Summary',
				'sort'		: sort,
				'page'		: page,
				'pagesize'	: pagesize,
				'pagecount'	: data.pagecount,
				'names'		: data.names,
				'fields'	: data.fields
			};
			if (err) {
				pageparams.title = title + ' - Error';
				pageparams.error = err;
			}
			else
				pageparams.data = data.result;
			res.render('plants-summary', pageparams);
		});
};

var printObj = require('../debug/printObj.js');

exports.ajax = function(req, res) {
	var params = req.query;
	var command = params.command;
	var callback =
		function (err) {
			res.setHeader('Content-Type', 'text/html');
			if (err)
				res.write('Error: ' + err.toString());
			else
				res.write('INVALIDATE'/* or DONE */);
			res.end();
		};
	printObj(params);	
	if (command = 'example') {
		// plants.example(callback);
	}
	else
		res.end('Invalid command or missing parameter: ' + command);
};
