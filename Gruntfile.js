module.exports = function (grunt) {
  'use strict';

  //load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //define tasks
  grunt.registerTask('server', ['connect:server', 'open:server', 'watch:server']);

  //env cfg
  var pkg = grunt.file.readJSON('package.json');
  var cfg = {
    src: './',
    // Change 'localhost' to '0.0.0.0' to access the server from outside.
    serverHost: '0.0.0.0',
    serverPort: 9000,
    livereload: 35729
  };

  //grunt config
  grunt.initConfig({
    pkg: pkg,
    cfg: cfg,

    connect: {
      options: {
        port: cfg.serverPort,
        hostname: cfg.serverHost,
        middleware: function(connect, options) {
          return [
            require('connect-livereload')({
              port: cfg.livereload
            }),
            // Serve static files.
            //数组会报错？
            connect.static(options.base[0]),
            // Make empty directories browsable.
            // connect.directory(options.base),
          ];
        }
      },
      server: {
        options: {
          // keepalive: true,
          base: cfg.src,
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:' + cfg.serverPort
      }
    },

    //监控文件变化
    watch: {
      options: {
        livereload: cfg.livereload,
      },
      server: {
        files: [cfg.src + '**'],
        // tasks: [''],
      },
    }
  });
};
