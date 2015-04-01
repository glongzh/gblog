/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.controllers')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$routeParams', '$location', 'Post', 'Common']

	function PostController($scope, $routeParams, $location, Post, Common) {
		var p = this;

		Post.get($routeParams.id).then(getSuccessFn, getFailedFn);

		p.jumpback = Common.jumpback;
		p.url = $location.absUrl();

		function toggleDuoshuoComments(id, url, title){
		    var el = document.createElement('div');//该div不需要设置class="ds-thread"
		    el.setAttribute('data-thread-key', id);//必选参数
		    el.setAttribute('data-url', url);//必选参数
		    el.setAttribute('data-title', title);//可选参数
		    DUOSHUO.EmbedThread(el);
		    jQuery('#comment').append(el);
		}

		function getSuccessFn(data, status, headers, config) {
			p.id = data.data.id;
			p.title = data.data.title;
			p.content = data.data.content;
			p.created_at = data.data.created_at;
			toggleDuoshuoComments(p.id, p.url, p.title);
		}

		function getFailedFn(data, status, headers, config) {
			
		}
	}
	
})();