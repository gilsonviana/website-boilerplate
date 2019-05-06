const gulp        = require('gulp'),
      concat      = require('gulp-concat'),
      cleanCSS    = require('gulp-clean-css'),      
      imageMin    = require('gulp-imagemin'),
      browserSync = require('browser-sync').create();

/**
 * Minify images
 */
gulp.task('imgSquash', () => {
    gulp.src('src/img/*.png')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img/'));
});

/**
 * Copy fonts
 */
gulp.task('fonts', () => {
    gulp.src('src/font/*.ttf')
        .pipe(gulp.dest('fonts/'));
});

/**
 * Copy HTML files
 */
gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

/**
 * Compile CSS files
 */
gulp.task('css', () => {
    gulp.src('src/style/**/*.css')        
        .pipe(concat('style.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('javascript', () => {
    gulp.src('src/script/**/*.js')
        .pipe(gulp.dest('dist/'));
});

/**
 * Create static server and watchers
 */
gulp.task('browser-sync', ['html','css', 'javascript'], () => {
   browserSync.init({
       server: {
           baseDir: 'dist/'
       }
   });
   
   gulp.watch('src/style/**/*.css', ['css']);
   gulp.watch('src/**/*.html', ['html']);
   gulp.watch('src/script/**/*.js', ['javascript']);
   
   gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

/**
 * Gulp default task
 */
gulp.task('default', ['browser-sync']);