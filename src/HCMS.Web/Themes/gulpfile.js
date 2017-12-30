var gulp = require('gulp');
var less = require('gulp-less');
var child = require('child_process');
var fs = require('fs');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
      .pipe(less({
      //    paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest('./css'));
});

gulp.watch('./less/**/*.less', function () {

    console.log('less compile');

    return gulp.src('./less/**/*.less')
    .pipe(less({
        //    paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./css'));
   

});



gulp.task('default',
    [
        'less'
    ], function () {


    });