/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['Auth', 'ngDialog', 'Common'];

	function NavbarController(Auth, ngDialog, Common) {
		var vm = this;

		vm.logout = logout;
		vm.register = register;
		vm.login = login;
		vm.toggleDrawer = Common.toggleDrawer;
		vm.hideDrawer = Common.hideDrawer;

		activate();

		function activate() {
			Auth.getAccountInfo('glongzh').then(getAccountOK, getAccountError);
		}

		function getAccountOK(data, status, headers, config) {
			vm.info = {};
			vm.info.avatar = data.data.avatar;
			vm.info.realname = data.data.realname;
			var profile = data.data.profile;
			if(profile)
			{
				vm.info.title = profile.title;
				vm.info.location = profile.location;
				vm.info.twitter = profile.twitter;
				vm.info.github = profile.github;
				vm.info.weibo = profile.weibo;
				vm.info.instagram = profile.instagram;
			}
		}

		function getAccountError(data, status, headers, config) {
			console.log(data.data);
		}

		function logout() {
			Auth.logout();
		}

		function register() {
			ngDialog.open({
				controller: 'RegisterController as vm',
				template: '/static/tpls/myauth/register.html',
				closeByDocument: false
			})
		}

		function login() {
			ngDialog.open({
				controller: 'LoginController as vm',
				template: '/static/tpls/myauth/login.html',
				closeByDocument: false
			})
		}

	}
})();