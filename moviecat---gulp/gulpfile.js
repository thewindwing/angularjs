// 引入gulp
var gulp = require('gulp');
// 压缩css插件
var cleanCSS = require('gulp-clean-css');
// 文件合并
var concat = require('gulp-concat');
// js压缩插件
var uglify = require('gulp-uglify');
// 图片压缩插件
var imagemin = require('gulp-imagemin');
// html压缩插件
var htmlmin = require('gulp-htmlmin');
// lessz转CSS插件
var less = require('gulp-less');
// 引入提供静态资源服务的插件
var browserSync = require('browser-sync').create();
// 用来刷新浏览器的方法
var reload      = browserSync.reload;

gulp.task('default',['cssmin','jsmin','imagemin','htmlmin','less'],function(){

	// 开启了一个静态资源服务器
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	// 监听文件变化 文件发生变化之后执行后面的任务
	gulp.watch(['src/*.html','src/css/*.css'],['htmlmin','cssmin']);

})

// css压缩
gulp.task('cssmin',function(){

	// 获取要处理的文件
	gulp.src('src/css/*.css')
		// 压缩操作
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe( gulp.dest('dist/css') )
		.pipe(reload({stream: true}))

});

// js合并压缩
gulp.task('jsmin',function(){

	gulp.src(['src/js/*.js','src/views/**/*.js'])
		// 文件合并 参数是文件合并之后的名字
		.pipe( concat('all.min.js') )
		// js代码压缩
		.pipe( uglify() )
		// 输出处理过后的文件
		.pipe( gulp.dest('dist/js') )
		.pipe(reload({stream: true}))

})

// 图片压缩
gulp.task('imagemin',function(){

	gulp.src('src/images/*')
		.pipe( imagemin() )
		.pipe(gulp.dest('dist/images'))
		.pipe(reload({stream: true}))

})

// html压缩
gulp.task('htmlmin',function(){

	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe( gulp.dest('dist') )
		.pipe(reload({stream: true}))

	gulp.src('src/views/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe( gulp.dest('dist/views') )
		.pipe(reload({stream: true}))

})


// less转换成CSS任务
gulp.task('less',function(){

	// 取到要处理的less文件
	gulp.src('src/less/*.less')
		// 将less转换为CSS
		.pipe( less() )
		// 压缩CSS
		.pipe(cleanCSS({compatibility: 'ie8'}))
		// 将处理的结果输出
		.pipe( gulp.dest('dist/less') )
		.pipe(reload({stream: true}))

})