asset-helper
========

Express.js view helper for including css or js tags!


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
           