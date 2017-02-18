var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel');
    uglify = require('gulp-uglify');

gulp.task('clean', function(){
    return del(['../distr'], {force: true});
});

gulp.task('build', ['clean'], function() {
    return gulp.src('../src/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('../distr'));
});
