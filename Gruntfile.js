module.exports = function (grunt) {
    grunt.initConfig({
        shell: { 
            options: {
                stdout: true,
                stderr: true
            },
            server: { /* Подзадача */
                command: 'java -cp epicgame.jar main.Main 8080'
            /* запуск сервера */
            }  
        }, /* grunt-shell */
	    fest: { 
		    templates: { /* Подзадача */
    			files: [{
        			expand: true,
        			cwd: 'templates', /* исходная директория */
        			src: '*.xml', /* имена шаблонов */
        			dest: 'public_html/js/tmpl' /* результирующая директория */
    		    }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                        // 'var <%= name %>Tmpl = <%= contents %> ;',
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            } 
	    }, /* grunt-fest */
        watch: {
            fest: { /* Подзадача */
                files: ['templates/*.xml'], /* следим за шаблонами */
                tasks: ['fest'], /* перекомпилировать */
                options: {
                    interrupt: true,
                    atBegin: true /* запустить задачу при старте */
                }
            },
            server: { /* Подзадача */
                files: [
                'public_html/css/**/*.css',
                'public_html/js/**/*.js'
                ], /* следим за JS */
                options: {
                    livereload: true /* автоматическая перезагрузка */
                }
            }
        }, /* grunt-contrib-watch */
        concurrent: {
            target: ['watch', 'shell'], /* Подзадача */
            options: {
                logConcurrentOutput: true /* Вывод процесса */
            }
        },
        sass: {
            build: {
                style: "compressed",
                css: { /* Подзадача */
                    files: [{
                        expand: true,
                        cwd: 'public_html/css', /* исходная директория */
                        src: '*.scss', /* имена шаблонов */
                        dest: 'public_html/css', /* результирующая директория */
                        ext:  '.css'
                    }]
                }
            }
        }, /* grunt-contrib-sass */
        requirejs: {
            build: { /* Подзадача */
                options: {
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/main.js"
                }
            }
        }, /* grunt-contrib-requirejs */
        uglify: {
            build: { /* Подзадача */
                files: {
                    'public_html/js/build.min.js':
                        ['public_html/js/build.js']
                }
            }
        }, /* grunt-contrib-uglify */
        concat: {    
            build: { /* Подзадача */
                separator: ';\n',
                src: [
                    'public_html/js/lib/almond.js',
                    'public_html/js/build/main.js'
                ],
                dest: 'public_html/js/build.js'
            }    
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');    

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask(
        'build',
        [
            'fest', 'requirejs:build',
            'concat:build', 'uglify:build', 'sass:build'
        ]
    );
};