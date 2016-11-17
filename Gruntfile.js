module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Sass
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/css/main.css': 'build/sass/main.scss',
                    'assets/css/bootstrap/bootstrap.css': 'build/sass/bootstrap.scss'
                }
            }
        },

        // Put all javascript files into one file
        concat: {
            js: {
                src: ['build/js/*.js'],
                dest: 'assets/js/main.js'
            }
        },

        // Minimize javascript files
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'assets/js/main.min.js': ['assets/js/main.js'],
                    'assets/js/vendor/jquery.min.js': ['build/js/vendor/jquery.js'],
                }
            }
        },

        // Minify all CSS files into 1 file
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'build/sass',
                        src: 'main.scss',
                        dest: 'assets/css',
                        ext: '.min.css'
                    }]
            },
            target: {
                files: [{
                        expand: true,
                        cwd: 'assets/css/bootstrap',
                        src: 'bootstrap.css',
                        dest: 'assets/css/bootstrap',
                        ext: '.min.css'
                    }]
            }
        },

        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                        expand: true,
                        cwd: 'build/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'assets/img/'
                    }]
            }
        },

        // Optimize SVGs
        svgmin: { //minimize SVG files
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                expand: true,
                cwd: 'build/img/icons',
                src: ['*.svg'],
                dest: 'assets/img/icons/'
            }
        },

        // Dekstop notifications
        notify: {
            welcome: {
                options: {
                    title: "Grunt", // Note we are outputting the package.json name variable here
                    message: "Lets roll: <%= pkg.name %>"
                }
            },
            minify: {
                options: {
                    title: "Grunt", // Note we are outputting the package.json name variable here
                    message: "Minify: <%= pkg.name %>"
                }
            },
            watching: {
                options: {
                    title: "Grunt", // Note we are outputting the package.json name variable here
                    message: "Watching: <%= pkg.name %>"
                }
            },
            another: {
                options: {
                    title: "Grunt",
                    message: "All good in da hood! :)"
                }
            }
        },

        // Watch file changes, file deletions or file additions
        watch: {
            scripts: {
                files: ['build/js/*.js'],
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['assets/css/*.{css,scss}', 'build/sass/**/*.{css,scss}'],
                tasks: ['sass', 'cssmin'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['build/img/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            svgs: {
                files: ['build/img/icons/*.svg'],
                tasks: ['svgmin']
            },

            notify: {
                files: ['build/sass/*.*', 'build/js/*.*', 'build/img/*.*'],
                tasks: ['notify:another']
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-sass'); // Sass
    grunt.loadNpmTasks('grunt-contrib-concat'); // Merge JS files
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Minify JS files
    grunt.loadNpmTasks('grunt-contrib-imagemin'); // Image optimization
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // Minify CSS files into 1 file
    grunt.loadNpmTasks('grunt-svgmin'); // Minify SVGs
    grunt.loadNpmTasks('grunt-contrib-watch'); // Watch changes
    grunt.loadNpmTasks('grunt-notify'); // Desktop notifications

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['notify:watching','watch']);
    grunt.registerTask('minify', ['notify:minify', 'sass', 'concat', 'uglify', 'cssmin', 'imagemin', 'svgmin']);

};
