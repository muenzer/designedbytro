angular.
module('frontendEvents').
component('frontendEventsListing', {
	templateUrl: 'frontend-events-listing.template.html',
	controller: function($http) {
		var self = this;

		$http.get('events.json').then(function(response) {
			self.events = response.data;
		}); 	
	}
}).
component('frontendEvents', {
	templateUrl: 'frontend-events.template.html',
	controller: function($http) {
		var self = this;

		$http.get('events.json').then(function(response) {
			self.events = response.data;
		}); 	
	}
});