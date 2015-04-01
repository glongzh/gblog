/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout.controllers')
		.controller('WrapperController', WrapperController);

	WrapperController.$inject = ['$scope', 'Common'];

	function WrapperController($scope, Common) {

		$scope.hideDrawer = Common.hideDrawer;

	}
})();