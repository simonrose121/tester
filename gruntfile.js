module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["client/assets/css"]
        },
          files: {
            "client/css/styles.css": "client/css/styles.less"
          }
        }
      },
      watch: {
        files: "client/css/*",
        tasks: ["less"]
      }
   });
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.registerTask('default', ['less']);
 };
