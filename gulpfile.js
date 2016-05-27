var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');
    webpack     = require('gulp-webpack');

var browserReloadWait = 400;

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

gulp.task("start",['webpack', 'serve'], function() {
    return gulp.watch([
                   './app/root/**/*.html',
                   './app/src/js/**/*.js',
                   './app/src/sass/**/*.scss'
               ],
               ['webpack', 'reload']);
});

gulp.task("webpack", function () {
    return gulp.src('./app/src/js/main.js')
        .pipe(webpack({
                          output: {
                              filename: 'bundle.js'
                          },
                          devtool: "source-map",
                          module: {
                              loaders: [
                                  {
                                      test: /\.scss$/,
                                      loaders: ["style", "css", "sass"]
                                  }
                              ]
                          }
                      }))
        .pipe(gulp.dest('./app/root/asset/js'));
});
