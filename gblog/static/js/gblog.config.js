/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.config')
		.config(config);

	config.$inject = ['$locationProvider', '$interpolateProvider'];

	function config($locationProvider, $interpolateProvider) {
		$locationProvider.hashPrefix('!');

		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}

})();