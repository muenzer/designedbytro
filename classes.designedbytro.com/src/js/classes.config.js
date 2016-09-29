angular.
module('frontendApp')
.config(function configure(CloudinaryProvider) {    
    CloudinaryProvider.configure({
        cloud_name: 'designedbytro',
        api_key: '539384243618677'
    });
})
.config(function($routeProvider, $locationProvider){
  $routeProvider
    .otherwise("/classes");

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
