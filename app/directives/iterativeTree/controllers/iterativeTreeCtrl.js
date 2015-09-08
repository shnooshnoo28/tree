define(['pages/home/module'], function (module) {

	'use strict';

	module.registerController('iterativeTreeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		if (!$rootScope.treesCntr) {
			$rootScope.treesCntr = 0;
		}

		$scope.elemId = ++$rootScope.treesCntr;

		$scope.parsedItems = function () {
			var stackItem = 0,
				current, children, i, len, depth,
				items = angular.copy($scope.items);

			while (current = items[stackItem++]) {
				current.depth = current.depth || 0;
				depth = current.depth;
				children = current.childNodes;
				for (i = 0, len = children.length; i < len; i++) {
					items.splice(stackItem + i, 0, {
						name: children[i].name,
						childNodes: children[i].childNodes,
						depth: depth + 1
					});
				}
			}

			return items;
		}();

		$scope.add = function(index, item) {
			$scope.parsedItems.splice(index+1, 0, {
				childNodes: [],
				depth: item.depth+1,
				name: "New Node"
			})
		};

		$scope.delete = function(index, item){
			var startIndex = index,
				endIndex = index,
				elemDepth = item.depth,
				current, i;

			while (current = $scope.parsedItems[++startIndex]) {
				if (current.depth > elemDepth) {
					endIndex++;
				} else {
					break;
				}
			}

			for (i = endIndex; i>=index; i--) {
				$scope.parsedItems.splice(i, 1);
			}
		};

		$scope.save = function () {
			window.localStorage['tree_' + $scope.elemId] = JSON.prune($scope.parsedItems);
			$.notify('Saved', 'success');
		};

		$scope.load = function () {
			if (typeof window.localStorage['tree_'+$scope.elemId] !== 'undefined') {
				$scope.parsedItems = JSON.parse(window.localStorage['tree_' + $scope.elemId]);
				$.notify('Loaded', 'success');
			} else {
				$.notify('Storage of this tree is empty', 'error');
			}
		};

		$scope.addRoot = function(){
			$scope.parsedItems.push({
				name: "New Node",
				childNodes: []
			});
		};
	}]);
});