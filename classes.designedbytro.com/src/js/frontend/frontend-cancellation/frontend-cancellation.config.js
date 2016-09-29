angular.
module('frontendCancellation')
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when("/cancellation",
      {
        template: "<frontend-cancellation />",
        title: "Cancellation Policy"
      }
    );

  $locationProvider.html5Mode(true);
});