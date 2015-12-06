var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function () {
    return gulp.src([
            '*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});