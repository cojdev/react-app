var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');

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

// Watch
gulp.task('watch', function(){
    gulp.watch('src/**/*.less', ['less']);
});
    
// Default
gulp.task('default', ['less', 'watch']);
