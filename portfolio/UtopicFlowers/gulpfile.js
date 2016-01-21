var gulp 				= require('gulp'),  
		uglify 			= require('gulp-uglify'),
		rename 			= require('gulp-rename'),
		imagemin 		= require('gulp-imagemin'),
		csso				= require('gulp-csso'),
		replace 		= require('gulp-replace'),
		runSequence = require('run-sequence');


gulp.task('minjs', function() {
  gulp.src(['src/**/*.js', '!src/**/*.min*'])
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min',
		extname: '.js'
	}))
	.pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
	return gulp.src(['src/**/*' ,'!src/**/*.+(jpg|png|js|css|html)'])
	.pipe(gulp.dest('build'))
})

gulp.task('minimg', function() {
	return gulp.src('src/**/*.+(jpg|png|svg|gif)')
	.pipe(imagemin())
	.pipe(gulp.dest('build'));
});

gulp.task('replace', function() {
	gulp.src('src/**/*.html')
	.pipe(replace('\.js', '.min.js'))
	.pipe(replace('\.css', '.min.css'))
	.pipe(gulp.dest('build/'));
});

gulp.task('mincss', function() {
  gulp.src(['src/**/*.css', '!src/**/*.min*'])
	.pipe(csso())
	.pipe(rename({
		suffix: '.min',
		extname: '.css'
	}))
	.pipe(gulp.dest('build/'));
});

gulp.task('build', function(callback) {
	runSequence('copy','minjs', 'mincss', 'minimg', 'replace', callback)
});