/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.directives')
		.directive('post', post);

	function post() {
		var directive = {
			restrict: 'E',
			scope: {
				post: '='
			},
			templateUrl: '/static/tpls/post/tag-post.html'
		};

		return directive;
	}
})();