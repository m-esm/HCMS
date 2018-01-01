'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var child = require('child_process');
var fs = require('fs');
var imagemin = require('gulp-imagemin');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less').pipe(less({
        //    paths: [path.join(__dirname, 'less', 'includes')]
    })).pipe(gulp.dest('./css'));
});

gulp.watch('./less/**/*.less', function () {

    console.log('less compile');

    return gulp.src('./less/**/*.less').pipe(less({
        //    paths: [path.join(__dirname, 'less', 'includes')]
    })).pipe(gulp.dest('./css'));
});

gulp.task('min', function () {
    return gulp.src('./img/**/*').pipe(imagemin()).pipe(gulp.dest('./img'));
});

gulp.task('default', ['less'], function () {});

