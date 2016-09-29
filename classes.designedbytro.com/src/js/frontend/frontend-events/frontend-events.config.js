angular.
module('frontendEvents')
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when("/events",
      {
        template: "<frontend-events />",
        title: "Private Events"
      }
    );

  $locationProvider.html5Mode(true);
});