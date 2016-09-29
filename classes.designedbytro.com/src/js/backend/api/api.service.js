angular.
module('api').
factory('apiService', ['$http', function($http){
	var apiUrl = 'https://7ryzk48yuc.execute-api.eu-central-1.amazonaws.com/dev/';

	var apiFactory = {};

	apiFactory.statusOptions = ['Registered', 'Confirmed', 'Wait List', 'Overdue', 'Unenrolled', 'Delete'];

	apiFactory.GetParticipants = function() {
		var url = apiUrl + 'GetParticipants';
		return $http.get(url);
	};

	apiFactory.GetStatus = function(status) {
		var url = apiUrl + 'GetStatus/' + status;
		return $http.get(url);
	};

	apiFactory.Register = function(item) {
		var data = {
			CourseSession: item.CourseSession,
			EmailAddress: item.EmailAddress,
			Message: "Yay, a space has opened up and you are now registered for"
		};
		$http.post(apiUrl + 'Register', data).success(function(data, status) {
			window.alert(data);
		});
	};

	apiFactory.Overdue = function(item) {
		var data = {
			CourseSession: item.CourseSession,
			EmailAddress: item.EmailAddress,
		};
		$http.post(apiUrl + 'Overdue', data).success(function(data, status) {
			window.alert(data);
		});
	};  

	apiFactory.Delete = function(item) {
		var data = {
			CourseSession: item.CourseSession,
			EmailAddress: item.EmailAddress,
		};
		$http.post(apiUrl + 'Delete', data).success(function(data, status) {
			window.alert('Item Deleted');
		});
	};  

	apiFactory.Confirm = function(item) {
		var data = {
			CourseSession: item.CourseSession,
			EmailAddress: item.EmailAddress,
		};
		$http.post(apiUrl + 'Confirm', data).success(function(data, status) {
			window.alert('Changed to Confirmed');
		});
	};  

	apiFactory.Unenroll = function(item) {
		var data = {
			CourseSession: item.CourseSession,
			EmailAddress: item.EmailAddress,
		};
		$http.post(apiUrl + 'Unenroll', data).success(function(data, status) {
			window.alert('Unenrolled');
		});
	};  

	return apiFactory;
}]);