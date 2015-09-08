define(['pages/home/module'], function (module) {

	'use strict';

	module.registerDirective('iterativeTree', function () {
		return {
			restrict: 'E',
			scope: {
				items: "=items"
			},
			templateUrl: 'app/directives/iterativeTree/views/iterativeTree.html',
			controller: 'iterativeTreeCtrl'
		};
	});

});