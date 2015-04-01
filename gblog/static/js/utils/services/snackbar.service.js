/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.utils.services')
		.factory('Snackbar', Snackbar);

	function Snackbar() {
		var Snackbar = {
			show: show,
			error: error
		}

		return Snackbar;

		function show(content, options) {
			_snackbar(content, options);
		}

		function error(content, options) {
			_snackbar('出错:' + content, options);
		}

		function _snackbar(content, options) {
			var ops = {};
			$.extend(ops, { timeout: 3000 }, options)
			ops.content = content;
			$.snackbar(ops);
		}
	}

})();