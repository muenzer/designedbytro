angular.
  module('backendApp').
  config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/backend', {
          title: "Backend",
          template: '<backend-index></backend-index>'
        }).
        when('/backend/participants', {
          title: "Participants",
          template: '<backend-participants></backend-participants>'
        }).
        when('/backend/status', {
          title: "Status",
          template: '<backend-status></backend-status>'
        }).  
        when('/backend/classes', {
          title: "Classes",
          template: '<backend-classes></backend-classes>'
        }).
        when('/backend/classes/:classid', {
          title: "Classes",
          template: '<backend-class></backend-class>'
        });
    }
  ]);