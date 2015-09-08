define(['pages/home/module'], function (module) {

	'use strict';

	module.registerDirective('contenteditable', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				element.bind('blur', function() {
					scope.$apply(function() {
						ctrl.$setViewValue(element.html());
					});
				});

				ctrl.$render = function() {
					element.html(ctrl.$viewValue);
				};

				ctrl.$render();
			}
		};
	});

});