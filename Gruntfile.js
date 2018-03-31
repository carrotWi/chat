module.exports = function (grunt) {
	grunt.initConfig({
		jshint : {
			files : ['*.js'],
			options : {
				globals : {
					JQuery : true,
					indent : true,
				}
			},
		},
		watch : {
			scripts: {
			    files: '*.js',
			    tasks: ['jshint'],
			 },
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('jshint',['jshint']);
}