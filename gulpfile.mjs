import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

const src = {
  root: './src/aobotan',
  pug: ['./src/aobotan/pug/**/*.pug', '!src/pug/**/_*.pug'],
  pugbase: './src/aobotan/pug',
  pugwatch: 'src/aobotan/pug/**/*.pug',
  sass: ['./src/aobotan/sass/**/*.scss'],
  sasswatch: './src/aobotan/sass/**/*.scss',
  img:'./src/aobotan/img/**/*',
  js: './src/aobotan/js/**/*.js'
};
 
const dest = {
  root: './dest/',
  pug: './dest/aobotan/',
  css: './dest/aobotan/css/',
  img: './dest/aobotan/img/',
  js: './dest/aobotan/js/'
};

const img_task = () => (
    gulp.src(src.img,{ encoding: false })
    .pipe(changed(dest.img))
    .pipe(imagemin([
        mozjpeg({quality: 85, progressive: true}),
        optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(dest.img))
);

const sass_task = () => {
  return gulp.src(src.sass)
  .pipe(plumber({
    errorHandler: (error) => {
    console.log(error.messageFormatted);
    },
  }))
  .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
  .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions",
          "ie >= 11",
          "Android >= 4"
        ],

      cascade: false,
      })
    ]))
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(dest.css))
  .pipe(browserSync.reload({stream:true}));
}

const pug_task = () => {
  return gulp.src(src.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: src.pugbase
    }))
    .pipe(gulp.dest(dest.pug))
    .pipe(browserSync.reload({stream:true}));
}

const js_task = () => {
  return gulp.src(src.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dest.js));
}

const server_task = () => {
  browserSync({
    server: {
      baseDir: dest.root,
    },
    startPath: '/aobotan/',
  });
}
 
const watch_task = () => {
  gulp.watch(src.pugwatch, pug_task);
  gulp.watch(src.sass, sass_task);
  gulp.watch(src.img, img_task);
  gulp.watch(src.js, js_task);
}
 
export default gulp.parallel(watch_task, server_task, img_task);
export {pug_task as pug};
export {sass_task as sass};
export {server_task as server};
export {img_task as img};
export {watch_task as watch};
export {js_task as js};

