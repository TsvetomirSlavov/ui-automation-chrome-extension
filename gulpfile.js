var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('lint', function() {
    return gulp.src(['./code/js/*.js', './code/js/tools/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});