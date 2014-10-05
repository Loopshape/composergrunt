/*
 * grunt-encoding
 * https://github.com/pigulla/grunt-encoding
 *
 * Copyright (c) 2013 Raphael Pigulla
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Example configuration
    encoding: {
      invalid_executable: {
          options: {
              iconv: 'foo'
          },
          files: {
              src: ['test/fixtures/ansi.txt', 'test/fixtures/simple.txt', 'test/fixtures/utf8.txt', 'test/fixtures/ucs2-be.txt']
          }
      },
      will_fail: {
        options: {
            encoding: 'UTF8'
        },
        files: {
          src: ['test/fixtures/ansi.txt', 'test/fixtures/simple.txt', 'test/fixtures/utf8.txt', 'test/fixtures/ucs2-be.txt']
        }
      },
      will_pass: {
        options: {
          charset: 'utf8'
        },
        files: {
            src: ['test/fixtures/simple.txt', 'test/fixtures/utf8.txt']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
