angular.
module('frontendClasses')
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when("/classes",
      {
        template: "<frontend-classes />",
        title: "Classes"
      }
    )
    .when("/classes/:classid",
      {
        template: "<frontend-class />",
      }
    );

  $locationProvider.html5Mode(true);
});
