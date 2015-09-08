require.config({
	baseUrl: '/app',
	paths: {
		'domReady': 'plugins/requirejs-domready/domReady',
		'angular': 'plugins/angular/angular.min',
		'angular-ui-router': 'plugins/angular-ui-router/release/angular-ui-router',
		'angular-resource': 'plugins/angular-resource/angular-resource.min',
		'angular-couch-potato': 'plugins/angular-couch-potato/dist/angular-couch-potato',
		'jquery': 'plugins/jquery/dist/jquery.min',
		'notifyjs': 'styles/js/notify.min',
		'json-prune': 'styles/js/JSON.prune'
	},

	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-ui-router': { deps: ['angular'] },
		'angular-resource': { deps: ['angular'] },
		'angular-couch-potato': { deps: ['angular'] },
		'notifyjs': { deps: ['jquery'] }
	},

	deps: ['./main']
});