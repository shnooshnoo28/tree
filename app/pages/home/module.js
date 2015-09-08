define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-resource'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.home', [
		'ui.router',
		'ngResource'
	]);

	module.config(function ($stateProvider, $couchPotatoProvider, $rootScopeProvider) {
		$rootScopeProvider.digestTtl(100);

		$stateProvider
			.state('app.home', {
				url: '/home',
				views: {
					"content@app": {
						controller: 'homeCtrl',
						templateUrl: 'app/pages/home/views/home.html',
						resolve: {
							deps: $couchPotatoProvider.resolveDependencies([
								'pages/home/controllers/homeCtrl'
							])
						}
					}
				},
				data:{
					title: 'Home'
				}
			});
	});

	couchPotato.configureApp(module);

	module.run(function ($couchPotato) {
		module.lazy = $couchPotato;
	});

	return module;
});