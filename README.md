# bs-eslint-message

BrowserSync plugin to display eslint errors (or any other message) within connected browsers. Built specifically for `gulp-eslint`, but uses eslint's native error object, so should work with any eslint wrapper that exposes a results object.

**Note:** Uses a lot of es6 syntax, so probably won't work in older browsers 💁

## Install

```shell
npm i browser-sync gulp-eslint bs-eslint-message
```

## Usage with gulp-eslint

```js
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const browserSync = require('browser-sync').create()

gulp.task('serve', () => {
  browserSync.init({
    server: 'dist',
    plugins: ['bs-eslint-message']
  })
})

gulp.task('lint', () => {
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.results(results => {
      browserSync.sockets.emit('msg:eslint', results)
    }))
    .pipe(eslint.format())
})
```

## Send a basic message

```js
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const browserSync = require('browser-sync').create()

gulp.task('serve', () => {
  browserSync.init({
    server: 'dist',
    plugins: ['bs-eslint-message']
  })
  // Basic message only needs title and body
  setTimeout(() => {
    browserSync.sockets.emit('msg', {
      title: 'Hello world',
      body: 'This is the best 💃'
    })
  }, 2000)
})
```
