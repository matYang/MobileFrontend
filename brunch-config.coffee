exports.config =
  modules:
    definition: false
    wrapper: false
  paths:
    public: 'public'
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor/
      order:
        before:[
          'app/app.js'
          'vendor/js/ionic.bundle.js'
        ]

    stylesheets:
      joinTo:
        'css/vendor.css': /^vendor/
        'css/app.css': /^app/
      order:
        before: [
          'vendor/css/ionic.css'
          'app/css/base.css'
        ]
  plugins:
    autoReload:
      enabled:
        js: on
        css: on
        assets: on

    imageoptimizer:
      path: 'images'
      smushit: no

      options:
        indentation:
          value: 4
          level: "warn"

        max_line_length:
          level: "ignore"

    jshint:
      pattern: /^app\/.*\.js$/
      options:
        bitwise: true
        curly: true
      globals:
        jQuery: true
      warnOnly: true

    gzip:
      paths:
        javascript: 'js'
        stylesheet: 'css'
      removeOriginalFiles: false
      renameGzipFilesToOriginalFiles: true

    uglify:
      mangle: false
      compress:
        global_defs:
          DEBUG: false

    cleancss:
      keepSpecialComments: 0
      removeEmpty: true

# Enable or disable minifying of result js / css files.
# minify: true