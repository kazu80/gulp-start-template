var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    sass        = require('gulp-sass'),
    runSequence = require('run-sequence'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    webpack     = require('gulp-webpack');

var browserReloadWait = 1000;

gulp.task('build', function (callback) {
    runSequence('clean', 'copy', callback);
});

gulp.task('copy', function () {
    return gulp.src(['app/**/*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    return del(['dist/*'], cb);
});

gulp.task('serve', function() {
    browserSync.init({
                         server: {
                             baseDir: './app/root'
                         },
                         browser: 'Google Chrome'
                     });
});

gulp.task('serve:dist', function() {
    browserSync.init({
                         server: {
                             baseDir: './dist/root'
                         },
                         browser: 'Google Chrome'
                     });
});

gulp.task('reload', function(){
    return setTimeout(function () {browserSync.reload();}, browserReloadWait);
});

gulp.task("start",['sass', 'webpack', 'serve'], function() {
    return gulp.watch([
                   './app/root/**/*.html',
                   './app/src/js/**/*.js',
                   './app/src/sass/**/*.scss'
               ],
               ['sass', 'reload']);
});

gulp.task("webpack", function () {
    return gulp.src('./app/src/js/main.js')
        .pipe(webpack({
                          cache: true,
                          watch: true,
                          keepalive: true,
                          output: {
                              filename: 'bundle.js'
                          },
                          devtool: "source-map",
                          module: {
                              loaders: [
                                  {
                                      test: /\.css$/,
                                      loader: "style!css"
                                  },
                                  {
                                      test: /\.scss$/,
                                      loaders: ["style", "css", "sass"]
                                  }
                              ]
                          }
                      }))
        .pipe(gulp.dest('./app/root/asset/js'));
});

gulp.task('sass', function () {
    return gulp.src('./app/src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
                          errorHandler: function(err) {
                              console.log(err.messageFormatted);
                              this.emit('end');
                          }
                      }))
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/root/asset/css'))
});