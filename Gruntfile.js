'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.loadNpmTasks('grunt-release-github');

    // Project configuration.
    grunt.initConfig({
        //Load configurations
        pkg: grunt.file.readJSON('package.json'),

        //Lint JS
        jshint: {
            all: ['Gruntfile.js', '*.js', 'src/**/*.js', 'tests/**/*.js'], //If you want to inspect more file, you change this.
            options: {
                jshintrc: '.jshintrc'
            }
        },

        //Execute mocha tests
        mochaTest: {
            tests: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['tests/**/*.js']
            }
        },

        release: {
            options: {
                changelog: true, //NOT CHANGE
                changelogFromGithub: true, //NOT CHANGE
                githubReleaseBody: 'See [CHANGELOG.md](./CHANGELOG.md) for details.', //NOT CHANGE
                npm: false, //CHANGE TO TRUE IF YOUR PROJECT IS A NPM MODULE 
                //npmtag: true, //default: no tag
                beforeBump: [], // IS NOT READY YET
                afterBump: [], // IS NOT READY YET
                beforeRelease: [], // IS NOT READY YET
                afterRelease: [], // IS NOT READY YET
                updateVars: ['pkg'], //NOT CHANGE
                github: {
                    repo: "aws1617-03/aws1617-03",
                    accessTokenVar: "GITHUB_ACCESS_TOKEN", //SET ENVIRONMENT VARIABLE WITH THIS NAME
                    usernameVar: "GITHUB_USERNAME" //SET ENVIRONMENT VARIABLE WITH THIS NAME
                }
            }
        },

        //IT IS RECOMENDED TO EXECUTE "grunt watch" while you are working.
        watch: {
            scripts: {
                files: ['public/**'],
                tasks: []
            },
            options: {
                livereload: {
                    host: 'localhost',
                    port: 9000
                }
            }
        },

    });

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    //TEST TASK
    grunt.registerTask('test', ['jshint', 'mochaTest']);

    //BUILD TASK
    grunt.registerTask('build', ['test']);

    //DEVELOPMENT TASK
    grunt.registerTask('dev', ['watch']);

};