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
          dev: {
              options: {
                  noLineComments: true
              }
          },
          watch: {
              options: {
                  noLineComments: true,
                  watch: true
              }
          }
      },
      assemble: {
        options: {
            layoutdir: 'src/templates/layouts',
            layout: ['default.hbs'],
            partials: ['src/templates/partials/{,*/}*.*', 'src/sprites/svg/*'],
            helpers: [''],
            flatten: true
        },
        en: {
            options: {
                data: ['src/templates/data/en/*.yml']
            },
            src: ['src/templates/pages/en/*.hbs'],
            dest: './web'
        },
        lt: {
            options: {
                data: ['src/templates/data/lt/*.yml']
            },
            src: ['src/templates/pages/lt/*.hbs'],
            dest: './web/lt/'
        },
    },
    svg_sprite: {
        generate: {
            cwd: 'web/assets/vendor/material-design-icons',
            src: [
                '../../../../web/assets/images/ic_menu_24px.svg',
                '../../../../web/assets/images/ic_home_24px.svg',
                '../../../../web/assets/images/ic_favorite_24px.svg',
                '../../../../web/assets/images/ic_timeline_24px.svg',
                '../../../../web/assets/images/ic_trackChanges_24px.svg',
                '../../../../web/assets/images/ic_visibility_24px.svg',
            ],
            dest: 'src/sprites',
            options: {
                shape: {
                    id: {
                        generator: function(filename) {
                            var id = filename.match(/ic_(\w+)_\d+/);
                            return id[1];
                        }
                    },
                },
                mode: {
                    symbol: {
                        dest: ''
                    }
                }
            }
        }
    },
    watch: {
        options: {
        },
        dev: {
            files: ['src/assets/sass/**/*.scss', 'src/templates/**/*.hbs'],
            tasks: ['compass:dev', 'assemble:site']
        },
        handlebars: {
            files: ['src/templates/*/*.hbs', 'src/templates/layouts/*.hbs' ],
            tasks: ['assemble:site']
        }
    },
  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-assemble',
    'grunt-svg-sprite'
].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('assemble:site', [
      'assemble:en',
      'assemble:lt',
  ]);
  // Default task(s).
  grunt.registerTask('default', [
      'compass:dist',
      'assemble:en',
      'assemble:lt',
  ]);

};
