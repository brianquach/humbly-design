var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream')

//
// Define vagrant deploy tasks
//
gulp.task('vagrant-deploy:clean', function () {
  return del(['/var/www/humblydesign'], { force: true }).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('vagrant-deploy:copy', ['deploy:clean'], function () {
  gulp.src([
    'dist/**/*',
    '!dist/humblydesign/**/*.{log,pyc}',
    '!dist/humblydesign/**/.*',
    '!dist/venv',
    '!dist/venv/**/*'
  ], { base: 'dist' })
    .pipe(gulp.dest('/var/www/humblydesign'));
});

gulp.task('local-deploy', ['vagrant-deploy:clean', 'vagrant-deploy:copy'], function() {
  console.log('Deploy complete');
});
//
// End vagrant deploy tasks
//

//
// Define build tasks
//
gulp.task('browserify', function () {
  var b = browserify();
  b.add('src/js/preprocessed/main.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('src/js/preprocessed/main.js'))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('clean:dist-static', function() {
  return del(['dist/humblydesign/static/**/*.*'], { force: true });
});

gulp.task('minify-code', ['browserify', 'clean:dist-static'], function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/humblydesign/static/js'));
  gulp.src('src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/humblydesign/static/css'));
});

gulp.task('minify-img', ['copy-vendor-code'], function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/humblydesign/static/img'));
});

// Copy all the 3rd-party frameworks/libraries/code/fonts into distribution folder
gulp.task('copy-vendor-code', ['minify-code'], function() {
  gulp.src('src/js/vendor/*.js')
    .pipe(gulp.dest('dist/humblydesign/static/js/vendor'));
  gulp.src('src/css/vendor/*.css')
    .pipe(gulp.dest('dist/humblydesign/static/css/vendor'));
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/humblydesign/static/css/fonts'));
});

gulp.task('build', ['minify-img'], function() {
  console.log('Build complete');
});

gulp.task('default', ['build']);
//
// END build tasks
//

//
// Define tasks to publish to main server
//
var config = {
  host: '198.199.108.187',
  port: 6565,
  username: 'bquach',
  privateKey: fs.readFileSync('/Users/bquach/.ssh/id_rsa')
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

gulp.task('publish:copy', function () {
  return gulp.src(['dist/humblydesign/**/*.*', '!dist/humblydesign/**/*.log', '!dist/humblydesign/**/.*', '!dist/humblydesign/__pycache__/*'])
      .pipe(gulpSSH.dest('/home/bquach/websites/humblydesign'));
});

gulp.task('publish:deploy', ['publish:copy'], function () {
  var gulpShell = gulpSSH.shell(['rm -rf /var/www/humblydesign/humblydesign', 'cp -R ~/websites/humblydesign/humblydesign /var/www/humblydesign'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
  return gulpShell;
});
gulp.task('publish', ['publish:deploy']);
//
// End tasks to publish to main server
//

//
// Define all watch tasks below here
//
gulp.task('watch', function () {
   gulp.watch('src/**/*.{js,css}', ['build']);
});
//
// End watch tasks
//
