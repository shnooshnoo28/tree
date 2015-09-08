var allTestFiles = [];
var TEST_REGEXP = /(_spec|_test)\.js$/i;

for (var file in window.__karma__.files) {
	if (TEST_REGEXP.test(file)) allTestFiles.push(file);
}

requirejs.config({
	baseUrl: '/base/app',

	paths: {
		'domReady': 'plugins/requirejs-domready/domReady',
		'angular': 'plugins/angular/angular.min',
		'angularMocks': 'plugins/angular-mocks/angular-mocks',
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
		'angularMocks': { deps: ['angular'] },
		'angular-ui-router': { deps: ['angular'] },
		'angular-resource': { deps: ['angular'] },
		'angular-couch-potato': { deps: ['angular'] },
		'notifyjs': { deps: ['jquery'] }
	},

	// ask Require.js to load these files (all our tests)
	deps: allTestFiles,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});