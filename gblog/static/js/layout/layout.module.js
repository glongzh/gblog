/* 
* @Author: Glong
* 
*/

(function () {
	'use strict';

	angular
		.module('gblog.layout',[
			'gblog.layout.controllers',
			'gblog.layout.directives'
		]);
	
	angular
		.module('gblog.layout.controllers', ['ngDialog']);
	angular
		.module('gblog.layout.directives', []);
})();