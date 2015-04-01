/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout.directives')
		.directive('pagenav', pagenav);

	function pagenav() {
		var directive = {
			controller: 'PagenavController',
			controllerAs: 'vm2',
			restrict: 'E',
			templateUrl: '/static/tpls/layout/pagenav.html'
		};

		return directive;
	}
})();