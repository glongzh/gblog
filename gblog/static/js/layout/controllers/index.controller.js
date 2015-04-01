/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout.controllers')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Auth'];

	function IndexController($scope, Auth) {
		var vm = this;

		vm.isAuthenticated = Auth.isAuthenticated();

	}
})();