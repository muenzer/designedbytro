angular.
module('hero').
component('hero', {
	bindings: {
		title: '@',
		hero: '@'
	},
	templateUrl: 'hero.template.html'
});
