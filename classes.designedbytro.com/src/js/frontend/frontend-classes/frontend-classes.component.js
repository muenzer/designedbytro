angular.
module('frontendClasses').
component('frontendClasses', {
	templateUrl: "frontend-classes.template.html",
	controller: ['dataFactory', function CategoryController(dataFactory) {
			var self = this;

			dataFactory.getCategories().then(function(response) {
				self.categories = response.data;
			});
		}]
});
angular.
module('frontendClasses').
component('frontendClassesImage', {
	bindings: {
  		image: '@'
  	},
	templateUrl: "frontend-classes-image.template.html"
});
angular.
module('frontendClasses').
component('frontendClassesSummary', {
	bindings: {
  		summary: '<'
  	},
	templateUrl: "frontend-classes-summary.template.html",
	controller: ['dataFactory', 'classFunctions', function ClassesController(dataFactory, classFunctions) {
			var self = this;

			self.classes = dataFactory.classes.query();
			self.classes.$promise.then(function(response) {
				classFunctions.date(self.classes);
			});
		}]
});
angular.
module('frontendClasses').
component('frontendClass', {
	    templateUrl: "frontend-classes-class.template.html",
	    controller: ['$routeParams', 'dataFactory', '$q', 'update', 'classFunctions', function ClassesController($routeParams, dataFactory, $q, update, classFunctions) {
			var self = this;
			var classid = $routeParams.classid;

			self.class = dataFactory.classes.get({id:classid});

			self.class.$promise.then(function(response){
				classFunctions.participants(classid, self.class.sessions);
				self.sessions = self.class.sessions;
			});

			self.alert = false;

			self.submit = function(classItem) {
				var participant = new dataFactory.participants(classItem.participant);

				participant.CourseSession = classItem.id + "#" + classItem.session.id;
				participant.Cost = classItem.price;
				participant.ClassName = classItem.title;
				participant.SessionName = classItem.session.title;
				participant.Date = classItem.session.date;
				participant.Type = classItem.type;

				console.log(participant);

				participant.$save(function() {
					var newStatus;
					if(classItem.session.waitlist) {
						newStatus = 'Wait List';
					} else {
						newStatus = 'Registered';
					}

					data = update.status(participant.participants, newStatus);

					dataFactory.participants.update({
						coursesession: participant.participants.CourseSession,
					    emailaddress: participant.participants.EmailAddress
					}, data);
				});

				self.alert = true;
			};
		}]
});
