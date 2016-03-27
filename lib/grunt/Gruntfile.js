module.exports = function(grunt) {
  require('./tasks/CSS.js')(grunt);
  require('./tasks/javascript.js')(grunt); 
 
  grunt.registerTask('extend', function() {
    console.log('I am extended' + JSON.stringify(grunt.config.data.stableDummydata));
     console.log('I am extended' + JSON.stringify(grunt.config.data));
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');  

  grunt.registerTask('default', 'default grunt task', function() {
    grunt.task.run('generateCss');
    grunt.task.run('generateJs');
    grunt.task.run('execute');
  });

};
