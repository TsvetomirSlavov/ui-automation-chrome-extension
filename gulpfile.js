const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('lint', function () {
    return gulp.src(['./code/js/*.js', './code/js/tools/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src(['./code/js/tools/*.js', './code/spec/fixture/*.js', './code/spec/*Spec.js'])
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless());
});