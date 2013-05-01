// Asset Loader

var path = require('path');
var nconf = require('nconf');

exports.init = function(locals, params) {

	// load params
	nconf.overrides(params);

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
		if (!req) {
			var defaultExt = nconf.get("default" + ext.toUpperCase());
			if (defaultExt) req = defaultExt;
			else req = nconf.get("defaultAsset");
		}
		
		// trim ext
		if (path.extname(req)) req.replace(path.extname, '');
		
		// turn req into array
		var reqArr = arrayd(req);

		// check for matching bundle
		var bundles = nconf.get('bundles');
		var name = "";
		var match = "";

		if (bundles) {
			// for each file that's been requested
			for (var i=0;i<reqArr.length;i++) {
				// look and see if this matches a bundle name
				name = reqArr[i];				
				match = bundles[ext][name];
				if (match) reqArr[i] = match;
			}
		}
			
		// get tags
		return getTags(reqArr, ext);	
					
	}
	
	// get tags
	function getTags(arr, ext) {
	
		// set vars
		var item = "";
		var html = "";
		
		// loop through files
		for (var i=0;i<arr.length;i++) {

			item = arr[i];
			
			if (item instanceof Array) {			
				// non-concatenated bundle, array inside an array
				for (var j=0; j<item.length;j++) {
					html += singleTag(item[j], ext);
				}				
			} else {
				// single file
				html += singleTag(item, ext);
			}
			
		}
		
		// return tags
		return html;
		
	}	
	// single tag builder
	function singleTag(item, ext) {		
		var src = path.join(getRoot(ext), item + '.' + ext);
		return tag[ext.toUpperCase()](src);
	}
	
	// helpers
	function arrayd(arg) {
		// if array
		if (arg instanceof Array) return arg;
		// or comma separated list
		else if (arg.search(',') > -1) return (arg.replace(/\s/g, "")).split(',');
		// else wrap in array
		else return [arg];
	}
	function getRoot(ext) {
		var rootName = "root" + ext.toUpperCase();
		if (nconf.get(rootName) != null) return nconf.get(rootName);
		else return nconf.get('root'); 
	}
	var tag = {};
	tag.CSS = function(src) {
		return '<link rel="stylesheet" type="text/css" href="' + src + '" ' + nconf.get('xhtml') + '>';
	}
	tag.JS = function(src) {
		return '<script type="text/javascript" src="' + src + '"></script>';
	}		
	// set locals 	
	locals.assets = new assetRouter;	
	locals.js = locals.assets.js;
	locals.css = locals.assets.css;
	
}