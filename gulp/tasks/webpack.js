var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var config  = require('../config');

gulp.task('start server with webpack', function () {
    gulp.src('./app/src/js/main.js')
        .pipe(plugins.webpack(config.webpack))
        .pipe(gulp.dest('./app/root/asset'));
});




