var gulp  = require('gulp');
var del   = require('del');

gulp.task('clean', function(callback) {
    return del(['dist/*'], callback);
});
