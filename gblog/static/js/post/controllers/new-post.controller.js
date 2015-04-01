/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.controllers')
		.controller('NewPostController', NewPostController);

	NewPostController.$inject = ['$scope', '$location', 'Post', '$upload', 'Snackbar', 'Auth', 'Common']

	function NewPostController($scope, $location, Post, $upload, Snackbar, Auth, Common) {
		var np = this;

		np.submit = submit;
		np.upload = upload;

		$scope.jumpback = Common.jumpback;

		activate();


		function activate() {
			if (!Auth.isAuthenticated()) {
				$location.url('/');
			};
		}

		function upload() {
			$upload.upload({
				url: '/api/v1/posts/',
				file: np.file,
				fields: {
					title: np.title,
					content: np.content,
					tags: np.tags
				}
			}).then(createSuccessFn, createFailedFn, progressFn);
		}

		function submit() {
			upload();
			// var tags = np.tags.split(',')

			// Post.create(np.title, np.content, tags)
			// 	.then(createSuccessFn, createFailedFn);	
		}

		function createSuccessFn(data, status, headers, config) {
			Snackbar.show('创建成功');
			$location.url('/');
		}
		function createFailedFn(data, status, headers, config) {
			Snackbar.show('创建出错！' + data.data);
		}
		function progressFn(evt) {
			
		}
	}
})();