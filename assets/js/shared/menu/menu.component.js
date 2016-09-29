angular.
module('menu').
component('menu', {
	templateUrl: 'menu.template.html',
	controller: function MenuController($http) {
		var self = this;

		self.menuStatus = false;

		$http.get('menu.json').then(function(response) {
			self.menu = response.data;
		});
	}
});
