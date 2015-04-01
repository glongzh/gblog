/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.myauth.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$location', 'Auth'];

	function LoginController($scope, $location, Auth) {
		var vm = this;
		vm.login = login;

		activate();

		function activate() {
			if (Auth.isAuthenticated()) {
				$location.url('/');
			}
		}

		function login() {
			Auth.login(vm.email, vm.password).then(loginCallback);
		}

		function loginCallback(msg) {
			vm.error = msg;
		}
	}
})();