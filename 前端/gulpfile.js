/**
 * Created by shin on 16/4/6.
 */
var gulp = require('gulp');
//var uglify=require('gulp-uglify'),//混淆插件 //基础库
imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),
    //livereload
    //server = tinylr();
    port = 35729,
    gzip = require('gulp-gzip');
    gulp.task('default', function () {
         /*gulp.src('js/FaceTouch.js').
    pipe(uglify()).
    pipe(gulp.dest('build'));*/
});

    //压缩并合并js
gulp.task('js',['css'],function( ){
        var jsSrc = ['js/tracking.js','js/ui.js','js/control.js','js/FaceTouch.js','js/loading.js','js/S3D.js','js/TIDA_Bridge.js','js/utils.js','js/wantu.js','js/Three3D.js'];
        var jsDst= '../publish/';
    gulp.src(jsSrc)
         .pipe(concat('main.js'))//合并为main.js
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.pipe(livereload(server))
        .pipe(gulp.dest(jsDst))
        .pipe(gulp.dest(''));
});

//图片的压缩合并
/*gulp.task('images' , function(){
    var imgSrc = 'images/*.jpg',
        imgDst = '../pu/images';
        gulp.src(imgSrc)
        .pipe(imagemin())
        //.pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});
*/

gulp.task('css', function () {
    var cssSrc = 'css/mainstyle.css',
        cssDst = '../publish/';

    gulp.src(cssSrc)
        .pipe(minifycss())
        .pipe(rename({suffix:'.mini'}))
        .pipe(gulp.dest(cssDst))
        .pipe(gulp.dest('./'));
});


gulp.task( 'html', ['js'],function() {
    var htmlSrc = 'index.html',
        htmlDst =
    '../publish/index/';
        gulp.
        src(htmlSrc)
      //  .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
            .pipe(gulp.dest('../publish/'));

}); gulp. task('minify',function(){
    gulp.src('js/FaceTouch.js').
        pipe(uglify()).
        pipe(gulp.dest('build'));
});

gulp.task('default',['html','js','css'])

