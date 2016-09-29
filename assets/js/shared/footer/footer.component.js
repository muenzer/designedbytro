angular.
module('footer').
component('footer', {
	templateUrl: 'footer.template.html',
	controller: function SocialController($http) {
		var self = this;

		$http.get('social.json').then(function(response) {
			self.social = response.data;
		});
	}
});
