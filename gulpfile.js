const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const through2 = require('through2')

const paths = {
  dest: {
    lib: 'lib', // common js
    esm: 'esm', // ES module
    dist: 'dist', // umd
  },
  styles: 'components/**/*.less',
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'],
}

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css')
}

function compileScript(babelEnv, destDir) {
  const { scripts } = paths
  process.env.BABEL_ENV = babelEnv

  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone())
        if (file.path.match(/([\/\\])style([\/\\])index\.js/)) {
          const content = file.contents.toString(encoding)
          file.contents = Buffer.from(cssInjection(content)) // content
          file.path = file.path.replace(/index\.js/, 'css.js') // rename
          this.push(file)
          next()
        } else {
          next()
        }
      }),
    )
    .pipe(gulp.dest(destDir))
}

function compileCJS() {
  const { dest } = paths

  return compileScript('cjs', dest.lib)
}

function compileESM() {
  const { dest } = paths

  return compileScript('esm', dest.esm)
}

function copyLess() {
  return gulp.src(paths.styles).pipe(gulp.dest(paths.dest.lib)).pipe(gulp.dest(paths.dest.esm))
}

function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssnano({ zIndex: false, reduceIdents: false }))
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm))
}

const buildScript = gulp.series(compileCJS, compileESM)

const build = gulp.parallel(buildScript, copyLess, less2css)

exports.build = build
exports.default = build
