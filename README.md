asset-loader
========

Express.js view helper for including css or js tags. Includes bundle system for managing groups of files.

This module is backend-agnostic - use any tool to preprocess your asset files and get them into place. Once they are in place, feed the filenames to the Asset Loader and then use the helpers to render your tags.


Installation
---

Load up the module in your app.js:

    var assets = require('asset-loader');
    assets.init(app.locals);


Configuration
---

By default, assets are expected to be in the /assets folder and the default asset name is 'app'.

Override like this:

    assets.init(app.locals, {prefix: '/tmp', defaultAsset: 'index'});
    

Load Single Files
---

Here's how to use the view helpers:

The long-form helper:

    <%- css('common') %>		outputs: <link type="stylesheet/css" href="/assets/common.css" />    
	<%- js('jquery') %>			outputs: <script type="text/javascript" src="/assets/query.js"></script>
        	
If no filename is given, they default to the "app" filename. (This can be changed in the settings.)

    <%- css() %>				<link type="stylesheet/css" href="/assets/app.css" />    		
    <%- js() %>					<script type="text/javascript" src="/assets/app.js"></script>
        
By default, asset loads files relative to the "root" setting (set to "/assets" by default). This can be changed in the settings.

Override the default root altogether by giving a full path (or URL) to your file:

    <%- css('/styles/common.css') %>
    <%- js('http://somedomain.com/jquery.min.js') %>


Load Multiple Files
---

Load multiple files, one after another, like this:

    <%- css('base, skin, custom') %>
    
Or like this:    
    
    <%- css(['base', 'skin', 'custom']) %>


Alternate Syntax
---

You can also use this syntax:

    <%- assets.css('common') %>          
    <%- assets.js('footer') %>          


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

    <%- js('head') %>					<!-- head js bundle -->
    <%- js('footer') %>					<!-- footer js bundle -->
        
Asset Loader always checks for a bundle before it prints out the filename.    


All Options
---

Here is the complete config object and its defaults:

    {
      prefix: '/assets',		// default public assets folder
	  defaultAsset: 'app',		// default asset filename
      bundles: null,			// bundle object
      helperName: 'assets',		// the name of the main view helper
      xhtml: true,				// closing slashes on link tags for xml compatibility
      prefixCSS: null,			// overrides prefix
      prefixJS: null,			// overrides prefix
      defaultCSS: null,			// overrides defaultAsset
      defaultJS: null			// overrides defaultAsset
    }  

                      
Inspiration
---

- [Sails.js](http://sails.js) and [Asset Rack](https://github.com/techpines/asset-rack)
- [Nap](https://github.com/craigspaeth/nap)
- [Connect Assets](https://github.com/adunkman/connect-assets)
- [Asset Smasher](https://github.com/jriecken/asset-smasher)
- [RequireJS](http://requirejs.org/)


Contact
---

Got suggestions? [Email](mailto:d@dylanized.com) or [tweet](http://twitter.com/dylanized) me