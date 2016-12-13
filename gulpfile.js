var gulp = require('gulp');
var del = require('del');

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
  console.log('Deploy finished');
});
