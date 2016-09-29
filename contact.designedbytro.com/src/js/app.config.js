angular.
module('frontendApp')
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when("/",
      {
        template: "<contact-form />",
        title: "Contact"
      }
    )
    .otherwise("/");

  $locationProvider.html5Mode(true);
})
.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if(current.$$route.title) {
          $rootScope.title = current.$$route.title;
        } else {
          $rootScope.title = "Designed By Trö";
        }
    });
}]);
