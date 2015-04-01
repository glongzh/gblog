/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';
	angular
		.module('gblog.myauth', [
			'gblog.myauth.controllers',
			'gblog.myauth.services'
		]);

	angular
		.module('gblog.myauth.controllers', []);

	angular
		.module('gblog.myauth.services', ['ipCookie']);
})();