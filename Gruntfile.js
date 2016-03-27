module.exports = function(grunt) {
  grunt.initConfig({
    stableDummydata: {
      test: {
        data: 'data',
        key: 'key1',
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false,
            pretty: true,
          }
        },
        files: {
          "index.html": ['./views/index.jade'],

        }
      }
    },
    execute: {
      target: {
        src: ['./bin/www']
      }
    },
    watch: {
      src: {
        files: 'public/javascripts/*.js',
        tasks: ['uglify']
      }
    },
  });

  require('./lib/grunt/Gruntfile.js')(grunt);

  

};
