let {dest, src, parallel } = require('gulp');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let watchify = require('watchify');
let tsify = require('tsify');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');

let path = {
  SRC_HTML: 'app/**/*.html',
  SRC_TSX: 'app/**/*.tsx',
  SRC_SCSS: 'app/**/*.scss',
  OUT_JS: 'app.js',
  OUT_CSS: 'style.css',
  DIST_DIR: 'dist/',
  ENTRY_POINT: 'app/app.tsx'
};

let b = browserify({
  entries: path.ENTRY_POINT,
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify, tsify]
});

let buildHtml = function(){
  return src(path.SRC_HTML)
  .pipe(dest(path.DIST_DIR));
};

let buildCss = function(){
  return src(path.SRC_SCSS)
  .pipe(concat(path.OUT_CSS))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(dest(path.DIST_DIR));
};

let buildJs = function(){
  return b.transform('babelify', {
      presets: ['env'],
      extensions: ['.tsx']
  })
  .bundle()
  .pipe(source(path.OUT_JS))
  .pipe(dest(path.DIST_DIR));
};

exports.buildHtml = buildHtml();
exports.buildJs = buildJs();
exports.buildCss = buildCss();
exports.default = parallel(buildHtml, buildCss, buildJs);