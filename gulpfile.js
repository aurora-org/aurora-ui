const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

const paths = {
  dest: {
    lib: 'lib', // common js
    esm: 'esm', // ES module
    dist: 'dist', // umd
  },
  styles: 'components/**/*.less',
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'],
}

function compileScript(babelEnv, destDir) {
  const { scripts } = paths

  process.env.BABEL_ENV = babelEnv

  return gulp.src(scripts).pipe(babel()).pipe(gulp.dest(destDir))
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
