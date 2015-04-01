/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.myauth.controllers')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', '$location', 'Auth'];

	function RegisterController($scope, $location, Auth) {
		var vm = this;

		vm.register = register;

		activate();

		function activate() {
			if (Auth.isAuthenticated()) {
				$location.url('/');
			};
		}

		function register() {
			Auth.register(vm.email, vm.username, vm.password, vm.confirm_password);
		}
	}

})();