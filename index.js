// Hi, I'm Asset Buddy!

var path = require('path');
var nconf = require('nconf');

exports.init = function(locals, params) {

	// load param defaults
	nconf.file({ file: path.join(__dirname, 'config.json') });	
	
	// asset router	
	function assetRouter() {	
		this.css = function(req) {
			return getBundle(req, "css");
		}
		this.js = function(req) {
			return getBundle(req, "js");
		}
	}

	// get bundle
	function getBundle(req, ext) {
	
		// fallback to default
		if (!req) req = nconf.get('index');
		
		// trim ext
		if (path.extname(req)) req.replace(path.extname, '');

		// check for matching bundle
		var bundles = nconf.get('bundles');
		if (bundles) {
			var match = bundles[ext][req];
			if (match) req = match;
		}		
		
		// get tags
		return getTags(arrayd(req), ext);	
					
	}
	
	// get tags
	function getTags(arr, ext) {
	
		// set vars
		var src = "";
		var tag = "";
		var html = "";
		
		// loop through files
		for (var i=0;i<arr.length;i++) {
			// figure out src
			src = path.join(nconf.get('prefix'), arr[i] + '.' + ext);
			// figure out tag
			if (ext === "css") tag = cssTag(src);
			if (ext === "js") tag = jsTag(src);
			// add to html buffer
			html += tag;
		}
		
		// return tags
		return html;
		
	}
	
	// helpers	
	function arrayd(arg) {
		// if array
		if (arg instanceof Array) return arg;
		// or csv
		else if (arg.search(',') > -1) return (arg.replace(/\s/g, "")).split(',');
		// else wrap in array
		else return [arg];
	}
	function cssTag(src) {
		return '<link rel="stylesheet" type="text/css" href="' + src + '" ' + nconf.get('xhtml5') + '>';
	}
	function jsTag(src) {
		return '<script type="text/javascript" src="' + src + '"></script>';
	}
	
	// set locals 	
	locals.assets = new assetRouter;	
	locals.js = locals.assets.js;
	locals.css = locals.assets.css;
	
}