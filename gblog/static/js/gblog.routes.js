/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.routes')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/',{
			controller: 'IndexController',
			controllerAs: 'index',
			templateUrl: '/static/tpls/layout/index.html'
		}).when('/new/', {
			controller: 'NewPostController',
			controllerAs: 'np',
			templateUrl: '/static/tpls/post/new-post.html'
		}).when('/post/:id/', {
			controller: 'PostController',
			controllerAs: 'p',
			templateUrl: '/static/tpls/post/post.html'
		}).when('/page/:page/', {
			controller: 'IndexController',
			controllerAs: 'index',
			templateUrl: '/static/tpls/layout/index.html'
		}).when('/settings/', {
			controller: 'SettingController',
			controllerAs: 'st',
			templateUrl: '/static/tpls/myauth/settings.html'
		}).otherwise('/');
	}
})();