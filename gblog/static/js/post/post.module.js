/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post', [
			'gblog.post.controllers',
			'gblog.post.services',
			'gblog.post.directives'
		]);

	angular.module('gblog.post.controllers', ['angularFileUpload']);

	angular.module('gblog.post.services', []);

	angular.module('gblog.post.directives', [])
	
})();