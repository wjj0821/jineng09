var gulp = require("gulp");
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var server = require("gulp-webserver");


gulp.task("sassTask", function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/css"))
})

gulp.task("watch", function() {
    return gulp.src("./src/scss/index.scss", gulp.series("sassTask"));
})
gulp.task('server', function() {
    return gulp.src("src")
        .pipe(server({
            port: 8998,
            middleware: function(req, res) {
                var pathname = require("url").parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end("");
                    return;
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(require("fs").readFileSync(require("path").join(__dirname, "src", pathname)))
            }
        }))
})
gulp.task("dev", gulp.series("sassTask", "server", "watch"));