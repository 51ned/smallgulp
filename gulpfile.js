const gulp         = require('gulp');
      
const autoprefixer = require('gulp-autoprefixer'),
      browsersync  = require('browser-sync').create(),
      cssclean     = require('gulp-clean-css'),
      pug          = require('gulp-pug'),
      scss         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps');


gulp.task('serve', function() {
  browsersync.init({
    server: {
      baseDir: './public',
      notify: false
    }
  });
});


gulp.task('pug', function() {
  return gulp.src('src/pug/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public'))
    .on('end', browsersync.reload);
});


gulp.task('scss', function() {
  return gulp.src('src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssclean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(browsersync.reload({
      stream: true
    }));
});


gulp.task('watch', function() {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'))
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'))
});


gulp.task('default', gulp.series(
  gulp.parallel('pug', 'scss'),
  gulp.parallel('watch', 'serve')    
))