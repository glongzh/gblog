/* 
* @Author: glongzh
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.post.services')
		.factory('Post', Post);

	Post.$inject = ['$http']

	function Post($http) {
		var Post = {
			get: get,
			all: all,
			update: update,
			create: create,
			destroy: destroy
		};

		return Post;

		function get(id) {
			return $http.get('/api/v1/posts/' + id + '/');
		}

		function update(id, title, content, tags) {
			return $http.put('/api/v1/posts/' + id + '/',{
				title: title,
				content: content,
				tags: tags
			});
		}

		function create(title, content, tags) {
			return $http.post('/api/v1/posts/', {
				title: title,
				content: content,
				tags: tags
			});
		}

		function destroy(id) {
			return $http.delete('/api/v1/posts/' + id + '/');		
		}

		function all(page) {
			if (page) {
				return $http.get('/api/v1/posts/?page=' + page);
			}else{
				return $http.get('/api/v1/posts/');
			}
			
		}
	}

})();