/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.directives')
		.directive('posts', posts);

	function posts() {
		var directive = {
			controller: 'PostsController',
			controllerAs: 'vm1',
			restrict: 'E',
			templateUrl: '/static/tpls/post/tag-posts.html'
		};

		return directive;
	}
})();