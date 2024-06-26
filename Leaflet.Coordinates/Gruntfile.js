'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: {
                src: ['dist/**/*']
            }
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name%>-<%= pkg.version%>.src.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version%>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version%>.css': ['src/Control.Coordinates.css'],
                    'dist/<%= pkg.name %>-<%= pkg.version%>.ie.css': ['src/Control.Coordinates.ie.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'dist/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2,
                    'adjoining-classes': false
                },
                src: ['src/**/*.css']
            }
        },
        jasmine: {
            pivotal: {
                src: [
                    'src/**/*.js'
                ],
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js',
                    vendor: [
                        'http://cdn.leafletjs.com/leaflet-0.5.1/leaflet-src.js'
                    ],
                    '--local-to-remote-url-access': true
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'spec'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'connect', 'jasmine', 'csslint', 'concat', 'uglify', 'cssmin']);

    grunt.registerTask('test', ['connect', 'jasmine']);

};
