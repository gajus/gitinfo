var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    eslint = require('gulp-eslint'),
    gitdown = require('gitdown');

gulp.task('lint', function () {
    return gulp
        .src(['./src/*.js', './src/tests/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function () {
    return gulp
        .src(['./tests/*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('gitdown', function () {
    return gitdown
        .readFile('.gitdown/README.md')
        .writeFile('README.md');
});

gulp.task('watch', function () {
    gulp.watch(['./src/*', './tests/*'], ['default']);
    gulp.watch(['./.gitdown/*'], ['gitdown']);
});

gulp.task('default', ['test']);
