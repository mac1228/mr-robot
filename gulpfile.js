const {dest, src, parallel, series, watch } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const LiveServer = require('gulp-live-server');
const browserSync = require('browser-sync');
const babelify = require('babelify');

const path = {
  SRC_HTML: 'app/**/*.html',
  SRC_TSX: 'app/**/*.tsx',
  SRC_SCSS: 'app/**/*.scss',
  OUT_JS: 'app.js',
  OUT_CSS: 'style.css',
  DIST_DIR: 'dist/',
  ENTRY_POINT: 'app/app.tsx'
};

const b = browserify({
  entries: path.ENTRY_POINT,
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify, tsify]
});

const buildHtml = () => {
  return src(path.SRC_HTML)
  .pipe(dest(path.DIST_DIR));
};

const buildCss = () => {
  return src(path.SRC_SCSS)
  .pipe(concat(path.OUT_CSS))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(dest(path.DIST_DIR));
};

const buildJs = () => {
  return b.transform('babelify', {
      presets: ['env'],
      extensions: ['.tsx']
  })
  .bundle()
  .pipe(source(path.OUT_JS))
  .pipe(dest(path.DIST_DIR));
};

const serve = () => {
  const server = new LiveServer('server/server.js');
  server.start();
  browserSync.init(null, {
    proxy:'http://localhost:3333',
    port: 9001,
    ghostMode: false
  });
};

const startWatchers = () => {
  watch(path.SRC_TSX, buildJs);

  watch(path.SRC_HTML, buildHtml);

  watch(path.SRC_SCSS, buildCss);

  watch(path.DIST_DIR + '/*', browserSync.reload);
}

exports.buildHtml = buildHtml();
exports.buildJs = buildJs();
exports.buildCss = buildCss();

const buildAll = parallel(buildHtml, buildCss, buildJs);

exports.default = buildAll;

exports.serve = series(buildAll, serve);
exports.watch = series(buildAll, serve, startWatchers);