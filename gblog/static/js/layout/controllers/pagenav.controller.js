/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout.controllers')
		.controller('PagenavController', PagenavController);

	PagenavController.$inject = ['$scope', '$routeParams'];

	function PagenavController($scope, $routeParams) {
		var vm2 = this;
		
		var page = parseInt($routeParams.page || 1);
		vm2.prevPage = page - 1;
		vm2.nextPage = page + 1;

		$scope.$watch('vm1.prev', function (newVal, oldVal) {
			vm2.prev = newVal;
		});
		$scope.$watch('vm1.next', function (newVal, oldVal) {
			vm2.next = newVal;
		});

	}
})();