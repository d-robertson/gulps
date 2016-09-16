var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// for react only
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  console.log('building');
  gulp.src(['src/**/*.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('concat.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
  gulp.src(['src/sass/**/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/scss'))
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['build']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('buildreact', function(){
  browserify({
    entries: 'src/reactapp.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify, {presets: 'react'})
  .bundle()
  .pipe(source('reactapp.js'))
  .pipe(gulp.dest('dist'));
});

// gulp.task('default', ['build', 'sass', 'watch']);

gulp.task('default', ['buildreact']);