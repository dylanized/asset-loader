asset-buddy
========

Express.js view helper for including css or js tags! Supports easy syntax and bundle aliases for groups of files.

This module is focused on simplicity and flexibility for the frontend, and is backend-agnostic - use whatever tools you want to process your asset files and get them into place. 


Installation
---

Load up the module in your app.js:

    var assets = require('asset-helper');
    assets.init(app.locals);

Configuration
---

By default, assets are expected to be in the /assets folder and the default asset name is 'app'.

Override like this:

    assets.init(app.locals, {prefix: '/tmp', def: 'index'});
    

Use for Single Files
---

All of these:

    <%- assets.css() %>
    <%- assets.css('app') %>
    <%- assets.css('app.css') %>
    <%- css('app') %>
    
print out this:

    <link type="stylesheet/css" href="assets/app.css" />    

And all of these:

    <%- assets.js() %>
    <%- assets.js('app') %>
    <%- assets.js('app.js') %>
    <%- js('app') %>

print out this:

    <script type="text/javascript" src="assets/app.js"></script>
    

Use for Multiple Files
---

Both of these:

    <%- assets.css('base, skin, custom') %>
    <%- assets.css(['base', 'skin', 'custom']) %>

print out these:

    <link type="stylesheet/css" href="assets/base.css" />
    <link type="stylesheet/css" href="assets/skin.css" />
    <link type="stylesheet/css" href="assets/custom.css" />  
      

Bundles
---

Asset Buddy supports bundles, which are really just special aliases that can be mapped to whatever file(s) you want.

In development mode, load up the bundles with your uncompressed assets:

    var bundleObj = {
      css: {
        app: ['base', 'skin', 'custom']
        custom: "custom"
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
	
It's up to you to take care of processing the files and naming them. Asset Buddy just gets those names and takes it from there. You can pass the bundlers filenames with or without an extension.      

In the views, call your bundles like other assets. All these would work:

    <%- css() %>						<!-- app css bundle -->
    <%- css('custom') %>				<!-- custom css bundle -->
    	
    <%- assets.js('head') %>			<!-- head js bundle -->
    <%- js('footer.js') %>				<!-- footer js bundle -->
        
Asset Buddy always checks for a bundle before it prints out the filename.    

All Options
---

Here is the complete config option and its defaults:

    {
      prefix: '/assets',
      def: 'app',
      bundles: null,
      helperName: 'assets', 	// the name of the main view helper
      xhtml5: true     			// closing slashes on link tags
    }  

           
Asset Smasher Integration
---

This plugin is made to work as a companion for Asset Smasher. Integration notes coming soon...

           
Inspiration
---

- [Sails.js](http://sails.js) and [Asset Rack](https://github.com/techpines/asset-rack)
- [Nap](https://github.com/craigspaeth/nap)
- [Connect Assets](https://github.com/adunkman/connect-assets)
- [Asset Smasher](https://github.com/jriecken/asset-smasher)