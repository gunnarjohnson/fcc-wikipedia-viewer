var gulp = require('gulp'),
autoPrefixer = require('autoprefixer'),
cssImport = require('postcss-import'),
cssVars = require('postcss-simple-vars'),
mixins = require('postcss-mixins'),
nested = require('postcss-nested'),
postCss = require('gulp-postcss');

gulp.task('styles', function() {
  return gulp.src('app/assets/styles/styles.css')
    .pipe(postCss([cssImport, mixins, cssVars, nested, autoPrefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('app/temp/styles'));
});
