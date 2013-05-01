// Asset Buddy!

var path = require('path');
var __ = require('underscore');

exports.init = function(locals, params) {

	// param defaults
	
	var prefix = '/assets';
	var def = 'app';
	var bundles;
	var xhtml5 = "/";

	// handle passed in parameters
	if (params) {
	 
		if (params.prefix) prefix = params.prefix;
		if (params.def) def = params.def;
		bundles = params.bundles;
		
		if (!params.xhtml5) xhtml5 = "";
		else xhtml5 = "/";
		
	}

	// assets view helper	
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
	
		this.ext = ext;

		// fallback to default
		if (!req) req = def;
		
		// trim ext
		if (path.extname(req)) req.replace(path.extname, '');

		// check for matching bundle
		if (bundles) {
			var match = bundles[ext][req];
			if (match) req = match;
		}		
					
		// convert request to an array if needed	
		var arr = arrayd(req);
		
		// get tags
		return getTags(arr, ext);	
					
	}
	
	function getTags(arr, ext) {
	
		// set vars
		var src = "";
		var tag = "";
		var html = "";
		
		// loop through files
		for (var i=0;i<arr.length;i++) {
			// figure out src
			src = path.join(prefix, arr[i] + '.' + ext);
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
		if (arg instanceof Array) return arg;
		else if (arg.search(',') > -1) return (arg.replace(/\s/g, "")).split(',');
		else return [arg];
	}
	function cssTag(src) {
		return '<link rel="stylesheet" type="text/css" href="' + src + '" ' + xhtml5 + '>';
	}
	function jsTag(src) {
		return '<script type="text/javascript" src="' + src + '"></script>';
	}
	
	// set locals 	
	locals.assets = new assetRouter;	
	locals.js = locals.assets.js;
	locals.css = locals.assets.css;
	
}