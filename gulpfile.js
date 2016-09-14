var gulp = require('gulp');

gulp.task('deploy', function () {
  gulp.src(['humblydesign/**/*.{html,css,js}', '!humblydesign/venv{,/**}'], { base: '.' })
    .pipe(gulp.dest('/var/www/humblydesign'));
  // gulp.src('humblydesign.wsgi')
  //   .pipe(gulp.dest('/var/www/humblydesign'));
});

gulp.task('default', ['deploy']);
