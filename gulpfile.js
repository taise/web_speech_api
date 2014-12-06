var gulp        = require('gulp')
   ,browserSync = require('browser-sync')
   ,uglify      = require('gulp-uglify')
   ,rename      = require('gulp-rename');

// start server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
          baseDir: "./"
        }
    });
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/js/*js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'));
});

// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("src/js/*.js", ['js', browserSync.reload]);
    gulp.watch("index.html", [browserSync.reload]);
});

