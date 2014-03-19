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
        middleware: function(connect, options, middlewares) {
          middlewares = [require('connect-livereload')({
            port: cfg.livereload
          })];
          options.base.forEach(function(i){
            middlewares.push(connect.static(i));
          });
          // Make empty directories browsable.
          // connect.directory(options.base),
          return middlewares;
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
        files: [cfg.src + 'src/**', './lib/**'],
        // tasks: [''],
      },
    }
  });
};
