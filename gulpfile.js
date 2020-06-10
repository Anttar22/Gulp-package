const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    file_include = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass');


function browser() {
    browserSync.init({
        server: {
            baseDir: './dest/',
        },
        port: 3000,
        notify: false
    })
} 

function html() {
    return gulp.src(['./_src/*.html', '!./_src/_**/*.html'])
        .pipe(file_include())
        .pipe(gulp.dest('./dest/'))
        .pipe(browserSync.stream())
}

function css() {
    return gulp.src('./_src/scss/style.scss')
        .pipe(scss({
            outputStyle: 'expanded' // Forms a full expanded file
            })
        ) 
        .pipe(gulp.dest('./dest/css/'))
        .pipe(browserSync.stream())
}

function watchFiles() {
    gulp.watch('./_src/**/*.html', html)
    gulp.watch('./_src/**/*.scss', css)
}

function clear() {
    return del('./dest')
}

let build = gulp.series(clear, gulp.parallel(html, css))
let watch = gulp.parallel(build, watchFiles, browser)

exports.css = css
exports.html = html
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch