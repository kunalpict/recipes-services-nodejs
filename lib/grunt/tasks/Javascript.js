module.exports = function(grunt) {

  grunt.config.merge({
    clean: {
      generatedJS: ["_generate/js/*.js"],
    },
    uglify: {
      js: {
        files: {
          '_generate/js/output.min.js': ['assets/javascripts/*.js']
        }
      }
    },
  });

  grunt.registerTask('generateJs', ['clean:generatedJS', 'uglify:js']);
};
