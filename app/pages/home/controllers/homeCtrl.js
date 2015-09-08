define(['pages/home/module'], function (module) {

	'use strict';

	module.registerController('homeCtrl', ['$scope', function ($scope) {
		$scope.items = [{
			name: "Parent 1",
			childNodes: [{
				name: "Child 1",
				childNodes: [{
					name: "SubChild 1",
					childNodes: []
				},{
					name: "SubChild 2",
					childNodes: []
				}]
			}, {
				name: "Child 2",
				childNodes: []
			}]
		},
		{
			name: "Parent 2",
			childNodes: [{
				name: "Child 3",
				childNodes: []
			}]
		}];
	}]);
});