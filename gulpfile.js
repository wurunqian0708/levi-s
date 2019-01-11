const gulp = require("gulp");

//拷贝html文件
gulp.task("copy-html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

//拷贝图片
gulp.task("images", function(){
	return gulp.src("indeximg/*.{jpg,png,ico}")
	.pipe(gulp.dest("dist/indeximages"))
	.pipe(connect.reload());
})
//拷贝json数据
gulp.task("data", function(){
	return gulp.src(["*.json", "!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})


gulp.task("build",["copy-html","images","data","scss","scss1","script"],function(){

})

//处理css文件
const scss = require("gulp-scss");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scss", function(){
	return gulp.src("index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("scss1", function(){
	return gulp.src("reset.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("reset.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

//处理js文件
gulp.task("script",function(){
	return gulp.src(["*.js", "!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//添加监听

gulp.task("watch", function(){
	gulp.watch("*.html", ["copy-html"]);
	gulp.watch("*.{jpg,png,ico}", ["images"]);
	gulp.watch(["*.json", "!package.json"], ["data"]);
	gulp.watch("index.scss", ["scss"]);
	gulp.watch("reset.scss", ["scss1"]);
	gulp.watch("*.js, !package.js", ["script"]);
})

//启动服务

const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root:"dist",
		port:8888,
		livereload:true
	})
})

//设置默认任务
gulp.task("default",["watch", "server"]);