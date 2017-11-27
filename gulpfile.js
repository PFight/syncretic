const gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var colors = gutil.colors;
var inject = require('gulp-inject');

function compileSass(sourceDir, targetDir, options) {
    options = options || {};
    !options.silent && gutil.log("Compiling SCSS in " + colors.magenta(sourceDir));
    return gulp.src(sourceDir + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(targetDir || sourceDir))
        .pipe(gulpif(options.verbose, print()))
        .on('end', () => !options.silent && gutil.log("Compilation of SCSS done."));
}

gulp.task('css', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./App/**/*.css'], { read: false });

    return target.pipe(inject(sources))
      .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./App/**/*.html'], { read: true });

    return target.pipe(inject(sources, {
        transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
      .pipe(gulp.dest('./'));
});

gulp.task('compiles-css', function () {
    return compileSass("./App", "./App");
});