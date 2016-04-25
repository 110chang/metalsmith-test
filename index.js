
// index.js

'use strict';

var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var rootpath   = require('metalsmith-rootpath');
var layouts    = require('metalsmith-layouts');
var sass       = require('metalsmith-sass');
var serve      = require('metalsmith-serve');
var watch      = require('metalsmith-watch');
var beautify   = require('metalsmith-beautify');

Metalsmith(__dirname)
  .use(markdown())
  .use(rootpath())
  //.use(layouts({ engine: 'handlebars' }))
  .use(layouts({ engine: 'jade' }))
  .use(sass({ outputDir: 'css/' }))
  .destination('./dist')
  .use(serve({
    port: 3000,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": "**/*.{md,jade,sass}",
      "layouts/**/*": "**/*.jade"
    },
    livereload: true
  }))
  .use(beautify({
    indent_size: 2,
    indent_char: ' ',
    js: false
  }))
  .build(function (err) {
    if(err) console.log(err)
  })
