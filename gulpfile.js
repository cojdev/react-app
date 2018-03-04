var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

// Compile Less files
gulp.task('less', function() {
    return gulp.src('src/less/**/main.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('docs/css'));
});

gulp.task('js', function() {
    return gulp.src(['src/js/!(App)*.js','src/js/App.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('docs/js'));
})

// Watch
gulp.task('watch', function(){
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['js']);
});
    
// Default
gulp.task('default', ['less', 'js', 'watch']);
