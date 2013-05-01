// Asset Buddy!

var path = require('path');
var __ = require('underscore');

exports.init = function(locals, params) {

	var prefix = '/assets';
	var def = 'app';

	if (params) {
		if (params.prefix) prefix = params.prefix;
		if (params.def) def = params.def;
	}

	function assetsHelper() {	
		this.css = function(file) {
			return assetTags(file, cssTag)
		}		
		this.js = function(file) {
			return assetTags(file, jsTag)
		}		
	}
	
	locals.assets = new assetsHelper;
	
	locals.js = locals.assets.js;
	locals.css = locals.assets.css;
	
	// helpers
	function assetTags(file, tag) {
		var html = "";
		__.each(arrayd(file), function(file) {
			html += tag(file);
		});
		return html;		
	}
	function getAssetSrc(file, ext) {
		if (!file) file = def;
		return (path.join(prefix, file + '.' + ext));
	}
	function arrayd(file) {
		if (file instanceof Array) return file;
		else if (file.search(',') > -1) return (file.replace(/\s/g, "")).split(',');
		else return [file];
	}
	function cssTag(file) {
		return '<link rel="stylesheet" type="text/css" href="' + getAssetSrc(file, "css") + '" />';
	}
	function jsTag(file) {
		return '<script type="text/javascript" src="' + getAssetSrc(file, "js") + '"></script>';
	}
}