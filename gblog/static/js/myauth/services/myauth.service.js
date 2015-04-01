/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.myauth.services')
		.factory('Auth', Auth);

	Auth.$inject = ['ipCookie', '$http'];

	function Auth(ipCookie, $http) {
		var Auth = {
			login: login,
			logout: logout,
			register: register,
			isAuthenticated: isAuthenticated,
			getAuthenticatedAccount: getAuthenticatedAccount,
			setAuthenticatedAccount: setAuthenticatedAccount,
			unauthenticate: unauthenticate,
			update: update,
			getAccountInfo: getAccountInfo
		};

		return Auth;

		function login(email, password) {
			var promise = $http.post('/api/v1/auth/login/', {
				email: email, password: password
			}).then(loginSuccessFn, loginFailedFn);
			return promise;
		}

		function loginSuccessFn(data, status, headers, config) {
			Auth.setAuthenticatedAccount(data.data);
			window.location = '/';
		}

		function loginFailedFn(data, status, headers, config) {
			return data.data.message;
		}

		function logout() {
			$http.post('/api/v1/auth/logout/').then(logoutSuccessFn, logoutFailedFn);
		}

		function logoutSuccessFn(data, status, headers, config) {
			Auth.unauthenticate();
			window.location = '/';
		}

		function logoutFailedFn(data, status, headers, config) {

		}

		function register(email, username, password, confirm_password) {
			ipCookie('tempe', email, {expires: 10, expirationUnit: 'seconds'});
			ipCookie('tempp', password, {expires: 10, expirationUnit: 'seconds'});
			$http.post('/api/v1/accounts/',{
				email: email,
				username: username,
				password: password,
				confirm_password: confirm_password
			}).then(registerSuccessFn, registerFailedFn);
		}

		function registerSuccessFn(data, status, headers, config) {
			Auth.login(ipCookie('tempe'), ipCookie('tempp'));
		}

		function registerFailedFn(data, status, headers, config) {
			console.log(data.data);
		}

		function setAuthenticatedAccount(data) {
			ipCookie('authenticatedAccount', data, {expires: 1, expirationUnit: 'days'})
			// $cookies.authenticatedAccount = JSON.stringify(data);
		}

		function getAuthenticatedAccount() {
			if (isAuthenticated()) {
				return ipCookie('authenticatedAccount');
			}
			else
			{
				return;
			}
		}

		function isAuthenticated() {
			return !!ipCookie('authenticatedAccount');
		}

		function unauthenticate() {
			ipCookie.remove('authenticatedAccount');
		}

		function getAccountInfo(username) {
			return $http.get('/api/v1/accounts/' + username + '/');
		}

		function update(data) {
			return $http.patch('/api/v1/accounts/' + data.username + '/',data);
		}


	}
})();