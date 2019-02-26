module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      compass: {
          options: {
              sassDir: 'src/assets/sass',
              imagesDir: 'src/img',
              cssDir: 'web/assets/css',
              force: true
          },

          dist: {
              options: {
                  environment: 'production',
                  noLineComments: true
              }
          },
      }
  });

  [
    'grunt-contrib-compass',
    'grunt-assemble',
].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', [
      'compass:dist'
  ]);

};
