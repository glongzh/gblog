/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.myauth.controllers')
		.controller('SettingController', SettingController);

	SettingController.$inject = ['$scope', '$location', 'Auth', 'Snackbar'];

	function SettingController($scope, $location, Auth, Snackbar) {
		var st = this;
		st.submit = submit;

		activate()

		function activate() {
			if(!Auth.isAuthenticated()){
				$location.url('/');
			}
			else{
				var user = Auth.getAuthenticatedAccount();
				st.id = user.id;
				st.email = user.email;
				st.username = user.username;
				st.realname = user.realname;
				if (user.profile) {
					st.title = user.profile.title;
					st.location = user.profile.location;
					st.twitter = user.profile.twitter;
					st.github = user.profile.github;
					st.weibo = user.profile.weibo;
					st.instagram = user.profile.instagram;
				}
			}
		}

		function submit() {
			var data = {
				id: st.id,
				email: st.email,
				username: st.username,
				realname: st.realname,
				profile: {
					title: st.title,
					location: st.location,
					twitter: st.twitter,
					github: st.github,
					weibo: st.weibo,
					instagram: st.instagram
				}
			};

			Auth.update(data).then(updateSuccessFn, updateFailedFn);
		}

		function updateSuccessFn(data, status, headers, config) {
			Auth.setAuthenticatedAccount(data.data);
			Snackbar.show('更新成功');
		}

		function updateFailedFn(data, status, headers, config) {
			Snackbar.show('更新失败：'+ data.data);
		}

	}
})();