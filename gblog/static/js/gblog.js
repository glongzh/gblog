/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog',[
			'gblog.config',
			'gblog.routes',
			'gblog.myauth',
			'gblog.layout',
			'gblog.post',
			'gblog.utils',
			'hc.marked'
		]);

	angular
		.module('gblog.config', []);

	angular
		.module('gblog.routes', ['ngRoute']);

	angular
		.module('gblog')
		.run(run);

	run.$inject = ['$http'];

	function run($http) {
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
	}

})();