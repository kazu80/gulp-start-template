var gulp = require('gulp');

gulp.task('copy', function () {
    return gulp.src(['app/**/*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_socket.io-client', function () {
    return gulp.src(['node_modules/socket.io-client/**/*'])
        .pipe(gulp.dest('app/root/asset/js/socket.io-client'));
});
