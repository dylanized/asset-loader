// Asset Loader

var path = require('path'),
	nconf = require('nconf');
	
exports.init = function(locals, params) {

	"use strict";

	// load params
	nconf.overrides(params);

	// load param defaults
	nconf.file({ file: path.join(__dirname, 'config.json') });	
	
	// asset router	
	function AssetRouter() {
		this.css = function() {
			return getBundle(arguments, "css");
		};
		this.js = function() {
			return getBundle(arguments, "js");
		};
	}

	// get bundle
	function getBundle(args, ext) {
	
		// convert arguments into normal array
		var argsArr = Array.prototype.slice.call(args);
		
		var reqArr = [];
	
		// if no argument, fallback to default
		if (argsArr.length === 0) reqArr = [getDefaultAsset(ext)];
		else reqArr = parseArgs(argsArr);
		
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

	// get asset tags
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
		if (!path.extname(item)) item += ('.' + ext);
		if ( (item.substring(0, 6) != "/") && (item.substring(0,4) != "http") ) {
			item = path.join(getPrefix(ext), item);
		}
		return tag[ext.toUpperCase()](item);
	}
	
	// helpers
	function parseArgs(args) {
		var outputArr = [];
		args.forEach(function(arg) {
			// if argument is an array of assets
			if (arg instanceof Array) outputArr = arg;
			// else if a comma separated string
			else if (arg.search(',') > -1) outputArr = (arg.replace(/\s/g, "")).split(',');
			// else its a single string
			else outputArr.push(arg);
		});
		return outputArr;
	}
	function getDefaultAsset(ext) {
		// check if there a defaultCSS or defaultJS set
		var extDefault = nconf.get("default" + ext.toUpperCase());
		if (extDefault) return extDefault;
		// else return defaultAsset
		else return(nconf.get("defaultAsset"));
	}
	function getPrefix(ext) {
		var prefixName = "prefix" + ext.toUpperCase();
		if (nconf.get(prefixName) != null) return nconf.get(prefixName);
		else return nconf.get('prefix'); 
	}
	var tag = {};
	tag.CSS = function(src) {
		return '<link rel="stylesheet" type="text/css" href="' + src + '" ' + nconf.get('xhtml') + '>';
		// add \n for line breaks
	};
	tag.JS = function(src) {
		return '<script type="text/javascript" src="' + src + '"></script>';
		// add \n for line breaks
	};

	// set locals
	locals.assets = new AssetRouter();
	locals.js = locals.assets.js;
	locals.css = locals.assets.css;

};