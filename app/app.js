define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'includes',
	'notifyjs',
	'json-prune'
], function (ng, couchPotato) {
	'use strict';

	var app = ng.module('app', [
		'ui.router',
		'scs.couch-potato',
		'app.home'
	]);

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					root: {
						templateUrl: 'app/layout/layout.html'
					}
				}
			});
		$urlRouterProvider.otherwise('/home');

	});

	couchPotato.configureApp(app);

	return app;
});