/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.utils.services')
		.factory('Common', Common);

	function Common() {
		var Common = {
			jumpback: jumpback,
			hideDrawer: hideDrawer,
			toggleDrawer: toggleDrawer
		}

		return Common;

		function jumpback() {
			window.history.back();
		}

		function hideDrawer() {
			$('#drawer').removeClass('activate');
			$('.navbar-brand .fa.fa-bars').removeClass('fa-rotate-90');
		}

		function toggleDrawer() {
			$('#drawer').toggleClass('activate');
			$('.navbar-brand .fa.fa-bars').toggleClass('fa-rotate-90');
		}

	}

})();