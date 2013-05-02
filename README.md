asset-loader
========

Express.js view helper for including css or js tags! Supports easy syntax, plus bundle aliases for groups of files and cachebusting.

This module is focused on simplicity and flexibility for the frontend, and is backend-agnostic - use whatever tools you want to process your asset files and get them into place. The intention is to be completely decoupled from the asset preprocessors.


Installation
---

Load up the module in your app.js:

    var assets = require('asset-loader');
    assets.init(app.locals);

Configuration
---

By default, assets are expected to be in the /assets folder and the default asset name is 'app'.

Override like this:

    assets.init(app.locals, {root: '/tmp', defaultAsset: 'index'});
    

Load Single Files
---

Here's some examples of the view helpers, and what they output:

The long-form helper:

    <%- assets.css('common') %>				<link type="stylesheet/css" href="/assets/common.css" />    
	<%- assets.js('jquery') %>    			<script type="text/javascript" src="/assets/query.js"></script>
        
Or the shortcut versions:

	<%- css('common') %>
	<%- js('jquery') %>
	
If no filename is given, the helpers default to the "app" filename. (This can be changed in the settings.)

    <%- assets.css() %>				<link type="stylesheet/css" href="/assets/app.css" />    		
    <%- assets.js() %>				<script type="text/javascript" src="/assets/app.js"></script>
        

Load Multiple Files
---

Load multiple files, one after another, like this:

    <%- assets.css('base, skin, custom') %>
    
Or like this:    
    
    <%- assets.css(['base', 'skin', 'custom']) %>
          

Bundles
---

Asset Loader supports bundles, which are special aliases that can be mapped to whatever file(s) you want.

In development mode, load up the bundles with your uncompressed assets:

    var bundleObj = {
      css: {
        app: ['base', 'skin', 'custom'],
        custom: ['custom']
      },  
      js: {
        head: ['jquery', 'common'], 
        footer: ['carousel', 'modernizr', 'popup']
      }
    }
  
In production mode, give the bundles the compressed and concat'd version, with a cachebuster too:

    var bundleObj = {
      css: {
    	  app: "app-kjhdky2r8ud2woidchjkwjd",
    	  custom: "custom-kljhdfwiufoi3jdlknd"
      },  
      js: {
        head: "head-kjdfksjhdflsdkjsldkfj", 
        footer: "footer-kcjhidiwuhewdioune"
      }
    }
     
Pass in your bundle object like this:

    assets.init(app.locals, { bundles: bundleObj });	
	
It's up to you to take care of processing the files and naming them. Asset Loader just gets those names and takes it from there. You can pass the bundlers filenames with or without an extension.      

In the views, call your bundles just like other assets:

    <%- css() %>						<!-- app css bundle -->
    <%- css('custom') %>				<!-- custom css bundle -->
    	
    <%- assets.js('head') %>			<!-- head js bundle -->
    <%- js('footer') %>					<!-- footer js bundle -->
        
Asset Loader always checks for a bundle before it prints out the filename.    


All Options
---

Here is the complete config option and its defaults:

    {
      root: '/assets',			// default assets root
	  defaultAsset: 'app'
      bundles: null,			// bundle object
      helperName: 'assets',		// the name of the main view helper
      xhtml: true,				// closing slashes on link tags for xml compatibility
      rootCSS: null,			// these override root
      rootJS: null,
      defaultCSS: null,			// these override defaultAsset
      defaultJS: null
    }  

                      
Inspiration
---

- [Sails.js](http://sails.js) and [Asset Rack](https://github.com/techpines/asset-rack)
- [Nap](https://github.com/craigspaeth/nap)
- [Connect Assets](https://github.com/adunkman/connect-assets)
- [Asset Smasher](https://github.com/jriecken/asset-smasher)
- [RequireJS](http://requirejs.org/)