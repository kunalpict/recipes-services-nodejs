var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
  gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
});