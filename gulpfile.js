var gulp = require('gulp');
var del = require('del');
var jsmin = require('gulp-minify');
var cssmin = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

gulp.task('deploy:clean', function () {
  return del(['/var/www/humblydesign'], { force: true }).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});
gulp.task('deploy:copy', ['deploy:clean'], function () {
  gulp.src([
    'dist/**/*',
    '!dist/humblydesign/**/*.{log,pyc}',
    '!dist/humblydesign/**/.*',
    '!dist/venv',
    '!dist/venv/**/*'
  ], { base: 'dist' })
    .pipe(gulp.dest('/var/www/humblydesign'));
});

gulp.task('deploy', ['deploy:copy'], function() {
  console.log('Deploy complete');
});

gulp.task('minify-code', function() {
  gulp.src('src/js/*.js')
    .pipe(
      jsmin({
        ext:{
          src:'-debug.js',
          min:'.js'
        }
      })
    ).pipe(gulp.dest('dist/humblydesign/static/js'));
  gulp.src('src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/humblydesign/static/css'));
});

gulp.task('minify-img', function() {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/humblydesign/static/img'));
});

// Copy all the 3rd-party frameworks/libraries/code/fonts into distribution folder
gulp.task('copy-vendor-code', function() {
  gulp.src('src/js/vendor/*.js')
    .pipe(gulp.dest('dist/humblydesign/static/js/vendor'));
  gulp.src('src/css/vendor/*.css')
    .pipe(gulp.dest('dist/humblydesign/static/css/vendor'));
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/humblydesign/static/css/fonts'));
});

gulp.task('build', ['minify-code', 'minify-img', 'copy-vendor-code'], function() {
  console.log('Build complete');
});

gulp.task('default', ['build']);

// Define all watch tasks below here

gulp.task('watch', function () {
   gulp.watch('src/**/*.{js,css}', ['build']);
});
