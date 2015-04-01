/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.controllers')
		.controller('PostsController', PostsController);

	PostsController.$inject = ['$scope', '$routeParams', 'Post']

	function PostsController($scope, $routeParams, Post) {
		var vm1 = this;
		var page = $routeParams.page;

		activate();

		function activate() {
			Post.all(page).then(getAllSuccessFn, getAllFailedFn);
		}

		function getAllSuccessFn(data, status, headers, config) {
			vm1.posts = data.data.results;
			vm1.prev = data.data.previous;
			vm1.next = data.data.next;
		}

		function getAllFailedFn(data, status, headers, config) {
			
		}
	}
	
})();