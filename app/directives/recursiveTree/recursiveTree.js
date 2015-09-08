define(['pages/home/module'], function (module) {

	'use strict';

	module.registerDirective('recursiveTree', function() {
		return {
			restrict: 'E',
			scope: {
                items: "=items"
            },
			templateUrl: 'app/directives/recursiveTree/views/recursiveTree.html',
            controller: 'recursiveTreeCtrl'
		};
	});

});