var gulp = require('gulp'),

    // General
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),

    // LESS & CSS
    less = require('gulp-less'),

    // JavaScript
    concat = require('gulp-concat');

var src = 'src';
var dest = 'docs';

// Compile Less files
gulp.task('less', function() {
    return gulp.src([src + '/less/**/main.less', src + '/less/**/gradient.less'])
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(e){
            gutil.log(e);
            this.emit('end');
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest + '/css'))
        .pipe(browserSync.reload({stream: true}));
});

// JavaScript
gulp.task('js', function() {
    return gulp.src([src + '/js/!(App)*.js',src + '/js/App.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest + '/js'));
})

// BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost',
        open: 'ui'
    });
});

// Watch
gulp.task('watch', function(){
    gulp.watch(src + '/**/*.less', ['less']);
    gulp.watch(src + '/**/*.js', ['js']);
});

// Sync Changes
gulp.task('sync', ['run', 'watch', 'browser-sync'], function() {
    gulp.watch('docs/js/*.js').on('change', browserSync.reload);
    gulp.watch('docs/*.html').on('change', browserSync.reload);
    gulp.watch('docs/css/*.css').on('change', browserSync.reload);
});

// Run default once
gulp.task('run', ['less']);
    
// Default
gulp.task('default', ['less', 'js', 'watch']);
