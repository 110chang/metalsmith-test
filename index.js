
// index.js

'use strict';

var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var jade       = require('metalsmith-jade');
var rootpath   = require('metalsmith-rootpath');
var layouts    = require('metalsmith-layouts');
var sass       = require('metalsmith-sass');
var serve      = require('metalsmith-serve');
var watch      = require('metalsmith-watch');
var beautify   = require('metalsmith-beautify');
var ignore     = require('metalsmith-ignore');

Metalsmith(__dirname)
  .use(jade({ pretty:false }))
  .use(markdown())
  .use(rootpath())
  //.use(layouts({ engine: 'handlebars' }))
  .use(sass({ outputDir: 'css/' }))
  .destination('./dist')
  .use(serve({
    port: 3000,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": "**/*.{md,jade,sass}"
    },
    livereload: true
  }))
  .use(layouts({
    engine: 'jade'
  }))
  .use(beautify({
    indent_size: 2,
    indent_char: ' ',
    js: false
  }))
  .build(function (err) {
    if(err) console.log(err)
  })
