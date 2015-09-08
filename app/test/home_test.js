define(['angular',
		'angular-ui-router',
		'angularMocks',
		'angular-couch-potato',
		'app',
		'pages/home/controllers/homeCtrl',
		'directives/recursiveTree/controllers/recursiveTreeCtrl',
		'directives/iterativeTree/controllers/iterativeTreeCtrl'
	], function(angular) {
		var $controller;
		var $scope;

		beforeEach(function() {
			angular.mock.module('app');

			angular.mock.inject(function (_$controller_) {
				$controller = _$controller_;
			});
		});

		describe('ControllerTest', function() {
			it('homeCtrl', inject(function($rootScope) {
				$scope = $rootScope.$new();
				$controller('homeCtrl', {
					$scope: $scope
				});
				expect($scope.items).toBeDefined();
			}));

			it('iterativeTreeCtrl', inject(function($rootScope) {
				$controller('iterativeTreeCtrl', {
					$scope: $scope
				});

				expect($rootScope.treesCntr).toBeDefined();
				expect($scope.elemId).toBeDefined();
				expect($scope.parsedItems).toEqual(expectedIterativeTreeParsedItems);
				$scope.addRoot();
				$scope.addRoot();
				expect($scope.parsedItems).toEqual(expectedIterativeTreeParsedItemsAddedRoots);
				$scope.save();
				expect(window.localStorage['tree_'+$scope.elemId]).toEqual(expectedIterativeTreeLocalStorage);
				$scope.parsedItems = [];
				$scope.load();
				expect($scope.parsedItems).toEqual(expectedIterativeTreeLoadFromLocalStorage);
				$scope.add(3, {depth: 3});
				expect($scope.parsedItems).toEqual(expectedIterativeTreeAddValue);
				$scope.delete(4, {depth: 3});
				expect($scope.parsedItems).toEqual(expectedIterativeTreeLoadFromLocalStorage);
			}));

			it('recursiveTreeCtrl', inject(function($rootScope) {
				var testItem = {name: "test Item",childNodes: []},
					testItem2 = {name: "test Item",childNodes: ['child1','child2','child3','child4']},
					testRoot = ['child1','child2','child3','child4'];

				$controller('recursiveTreeCtrl', {
					$scope: $scope
				});

				$scope.addRoot();
				$scope.addRoot();
				$scope.add(testItem);
				$scope.delete(2, testItem2);
				$scope.delete(2, undefined, testRoot);
				$scope.save();
				expect($rootScope.treesCntr).toBeDefined();
				expect($scope.elemId).toBeDefined();
				expect(testItem).toEqual(expectedRecursiveTreeTestItem);
				expect(testItem2).toEqual(expectedRecursiveTreeTestItem2);
				expect(testRoot).toEqual(['child1','child2','child4']);
				expect($scope.items).toEqual(expectedRecursiveTreeScopeItems);
				expect(window.localStorage['tree_'+$scope.elemId]).toEqual(expectedRecursiveTreeLocalStorage);
				$scope.parsedItems = [];
				$scope.load();
				expect($scope.parsedItems).toEqual(expectedRecursiveTreeScopeParsedItems);
			}));
		});

		var expectedIterativeTreeParsedItems = [{
				name: "Parent 1",
				depth: 0,
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
			}, {
				name: "Child 1",
				depth: 1,
				childNodes: [{
					name: "SubChild 1",
					childNodes: []
				},{
					name: "SubChild 2",
					childNodes: []
				}]
			}, {
				name: "SubChild 1",
				depth: 2,
				childNodes: []
			}, {
				name: "SubChild 2",
				depth: 2,
				childNodes: []
			}, {
				name: "Child 2",
				depth: 1,
				childNodes: []
			}, {
				name: "Parent 2",
				depth: 0,
				childNodes: [{
					name: "Child 3",
					childNodes: []
				}]
			}, {
				name: "Child 3",
				depth: 1,
				childNodes: []
			}],
			expectedIterativeTreeParsedItemsAddedRoots = [{
				name: "Parent 1",
				depth: 0,
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
			}, {
				name: "Child 1",
				depth: 1,
				childNodes: [{
					name: "SubChild 1",
					childNodes: []
				},{
					name: "SubChild 2",
					childNodes: []
				}]
			}, {
				name: "SubChild 1",
				depth: 2,
				childNodes: []
			}, {
				name: "SubChild 2",
				depth: 2,
				childNodes: []
			}, {
				name: "Child 2",
				depth: 1,
				childNodes: []
			}, {
				name: "Parent 2",
				depth: 0,
				childNodes: [{
					name: "Child 3",
					childNodes: []
				}]
			}, {
				name: "Child 3",
				depth: 1,
				childNodes: []
			}, {
				name: "New Node",
				childNodes: []
			}, {
				name: "New Node",
				childNodes: []
			}],
			expectedRecursiveTreeTestItem = {
				name: "test Item",
				childNodes: [{
					name: "New Node",
					childNodes: []
				}],
				showChildren: true
			},
			expectedRecursiveTreeTestItem2 = {
				name: "test Item",
				childNodes: ['child1','child2','child4']
			},
			expectedRecursiveTreeScopeItems = [{
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
			}, {
				name: "Parent 2",
				childNodes: [{
					name: "Child 3",
					childNodes: []
				}]
			}, {
				name: "New Node",
				childNodes: []
			}, {
				name: "New Node",
				childNodes: []
			}
			],
			expectedIterativeTreeLocalStorage = '[{"name":"Parent 1","childNodes":[{"name":"Child 1","childNodes":[{"name":"SubChild 1",' +
				'"childNodes":[]},{"name":"SubChild 2","childNodes":[]}]},{"name":"Child 2","childNodes":[]}],"depth":0},{"name":"Child 1",' +
				'"childNodes":"-pruned-","depth":1},{"name":"SubChild 1","childNodes":"-pruned-","depth":2},{"name":"SubChild 2",' +
				'"childNodes":"-pruned-","depth":2},{"name":"Child 2","childNodes":"-pruned-","depth":1},{"name":"Parent 2",' +
				'"childNodes":[{"name":"Child 3","childNodes":[]}],"depth":0},{"name":"Child 3","childNodes":"-pruned-","depth":1},' +
				'{"name":"New Node","childNodes":[]},{"name":"New Node","childNodes":[]}]',
			expectedRecursiveTreeLocalStorage = '[{"name":"Parent 1","childNodes":[{"name":"Child 1",' +
				'"childNodes":[{"name":"SubChild 1","childNodes":[]},{"name":"SubChild 2","childNodes":[]}]},{"name":"Child 2","childNodes":[]}]},' +
				'{"name":"Parent 2","childNodes":[{"name":"Child 3","childNodes":[]}]}]',
			expectedRecursiveTreeScopeParsedItems = [{
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
			}],
			expectedIterativeTreeLoadFromLocalStorage = [ Object({ name: 'Parent 1', childNodes: [ Object({ name: 'Child 1', childNodes: [ Object({ name: 'SubChild 1', childNodes: [  ] }),
				Object({ name: 'SubChild 2', childNodes: [  ] }) ] }), Object({ name: 'Child 2', childNodes: [  ] }) ], depth: 0 }),
				Object({ name: 'Child 1', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'SubChild 1', childNodes: '-pruned-', depth: 2 }),
				Object({ name: 'SubChild 2', childNodes: '-pruned-', depth: 2 }),
				Object({ name: 'Child 2', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'Parent 2', childNodes: [ Object({ name: 'Child 3', childNodes: [  ] }) ], depth: 0 }),
				Object({ name: 'Child 3', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'New Node', childNodes: [  ] }),
				Object({ name: 'New Node', childNodes: [  ] })
			],
			expectedIterativeTreeAddValue = [ Object({ name: 'Parent 1', childNodes: [ Object({ name: 'Child 1', childNodes: [ Object({ name: 'SubChild 1', childNodes: [  ] }),
				Object({ name: 'SubChild 2', childNodes: [  ] }) ] }), Object({ name: 'Child 2', childNodes: [  ] }) ], depth: 0 }),
				Object({ name: 'Child 1', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'SubChild 1', childNodes: '-pruned-', depth: 2 }),
				Object({ name: 'SubChild 2', childNodes: '-pruned-', depth: 2 }),
				Object({childNodes: [], depth: 4, name: 'New Node'}),
				Object({ name: 'Child 2', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'Parent 2', childNodes: [ Object({ name: 'Child 3', childNodes: [  ] }) ], depth: 0 }),
				Object({ name: 'Child 3', childNodes: '-pruned-', depth: 1 }),
				Object({ name: 'New Node', childNodes: [  ] }),
				Object({ name: 'New Node', childNodes: [  ] })
			];
});