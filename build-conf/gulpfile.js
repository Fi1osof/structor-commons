var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel');
    uglify = require('gulp-uglify');

gulp.task('clean-dev', function(){
    return del(['/Users/ipselon/Development/projects/structor/test/node_modules/structor-commons/distr'], {force: true});
});

gulp.task('clean', function(){
    return del(['../distr'], {force: true});
});

gulp.task('build-dev', ['clean-dev'], function() {
    return gulp.src('../src/**/*.js')
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest('/Users/ipselon/Development/projects/structor/test/node_modules/structor-commons/distr'));
});

gulp.task('build', ['clean'], function() {
    return gulp.src('../src/**/*.js')
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest('../distr'));
});
