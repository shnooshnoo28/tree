define(['pages/home/module'], function (module) {

	'use strict';

	module.registerController('recursiveTreeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		if (!$rootScope.treesCntr) {
			$rootScope.treesCntr = 0;
		}

		$scope.elemId = ++$rootScope.treesCntr;
		$scope.parsedItems = angular.copy($scope.items);

		$scope.add = function(item){
			item.childNodes.push({
				name: "New Node",
				childNodes: []
			});
			item.showChildren = true;
		};

		$scope.delete = function(index, item, root){
			if (typeof item === 'undefined') {
				root.splice(index, 1);
			} else {
				item.childNodes.splice(index, 1);
			}
		};

		$scope.addRoot = function(){
			$scope.items.push({
				name: "New Node",
				childNodes: []
			});
		};

		$scope.save = function() {
			window.localStorage['tree_'+$scope.elemId] = JSON.prune($scope.parsedItems);
			$.notify('Saved', 'success');
		};

		$scope.load = function() {
			if (typeof window.localStorage['tree_'+$scope.elemId] !== 'undefined') {
				$scope.parsedItems = JSON.parse(window.localStorage['tree_'+$scope.elemId]);
				$.notify('Loaded', 'success');
			} else {
				$.notify('Storage of this tree is empty', 'error');
			}
		};
	}]);
});