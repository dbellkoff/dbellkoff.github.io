var gulp 				= require('gulp'),  
		uglify 			= require('gulp-uglify'),
		rename 			= require('gulp-rename'),
		imagemin 		= require('gulp-imagemin'),
		htmlmin 		= require('gulp-htmlmin'),
		csso				= require('gulp-csso'),
		replace 		= require('gulp-replace'),
		runSequence = require('run-sequence'),
    util 				= require('gulp-util'),
		minifyJSON	= require('gulp-json-minify')
		htmlSrc 		= require('gulp-html-src');


gulp.task('minjs', function() {
  gulp.src(['../src/**/*.js', '!../src/**/*.min*'])
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(replace(/(\.min)*\.json/g, '.min.json'))
		.pipe(gulp.dest('../build/'));
});

gulp.task('minjson', function() {
	gulp.src(['../src/**/*.json', '!../src/**/*.min*'])
		.pipe(minifyJSON())
		.pipe(rename({
			suffix: '.min',
			extname: '.json'
		}))
		.pipe(gulp.dest('../build/'))
		.on('error', util.log);
})

gulp.task('copy', function() {
	return gulp.src(['../src/**/*' ,'!../src/**/*.+(jpg|png|js|*css*|html|json)'])
		.pipe(gulp.dest('../build'))
})

gulp.task('copy:libs', function() {
	return gulp.src('../src/**/*.html')
		.pipe(htmlSrc({presets: 'script'}))
		.pipe(gulp.dest('../build/js/libs/'))
})

gulp.task('minimg', function() {
	return gulp.src('../src/**/*.+(jpg|png|svg|gif)')
		.pipe(imagemin())
		.pipe(gulp.dest('../build'));
});




/*
		HTML
*/

gulp.task('html:build', ['html:replace', 'html:build:min'], function (){
	console.log('Building files');
})


//Minification 
gulp.task('html:min', function() {
	return gulp.src('../src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('../build/'))
})
//Minification in build folder
gulp.task('html:build:min', function() {
	return gulp.src('../build/**/*.html')

		.pipe(gulp.dest('../build/'))
})
//Replace links
gulp.task('html:replace', function() {
	gulp.src('../src/**/*.html')
		.pipe(replace(/(\.min)*\.js/g, '.min.js'))
		.pipe(replace(/(\.min)*\.css/g, '.min.css'))
		.pipe(replace(/(\.\.\/bower_components)\/(.*)[/](.*(.js))/g, 'js/libs/$3'))
		.pipe(replace(/(\.\.\/bower_components)\/(.*)[/](.*(.css))/g, 'css/libs/$3'))
		.pipe(gulp.dest('../build/'));
});
//temp, working
gulp.task('html:replace+min', function() {
	gulp.src('../src/**/*.html')
		.pipe(replace(/(\.min)*\.js/g, '.min.js'))
		.pipe(replace(/(\.min)*\.css/g, '.min.css'))
		.pipe(replace(/(\.\.\/bower_components)\/(.*)[/](.*(.js))/g, 'js/libs/$3'))
		.pipe(replace(/(\.\.\/bower_components)\/(.*)[/](.*(.css))/g, 'css/libs/$3'))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('../build/'));
});





/*
		CSS
*/

gulp.task('css:build', function(callback) {
	runSequence('css:min', callback)
});

gulp.task('css:min', function() {
  gulp.src(['../src/**/*.css', '!../src/**/*.min*'])
		.pipe(replace('/*!', '/*'))
		.pipe(csso())
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(gulp.dest('../build/'));
});


gulp.task('build', function(callback) {
	runSequence('copy','minjs', 'minjson', 'css:build', 'minimg', 'html:replace+min', callback)
});