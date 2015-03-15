module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['bin'],
    uglify: {
      prod: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          mangle: true,
          compress: true
        },
        files: {
          'bin/<%= pkg.name %>.min.js' : ['src/js/*.js']
        }
      }
    },
    processhtml: {
      options: {
        data: {
          message: 'Configure html for prod'
        }
      },
      dist: {
        files: {
          'bin/index.html': ['src/index.html']
        }
      }
    },
    copy: {
      css: {
        src: 'src/style.css',
        dest: 'bin/style.css'
      },
      jslib: {
        src: 'src/js/lib/*',
        dest: 'bin/lib/',
        filter: 'isFile',
        expand: true,
        flatten: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'processhtml', 'copy']);
};