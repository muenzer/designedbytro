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
	controller: ['classesService', function ClassesController(classesService) {
			var self = this;

			self.$onInit = function () {
				self.classes = classesService.get();
			};

		}]
});
angular.
module('frontendClasses').
component('frontendClass', {
	    templateUrl: "frontend-classes-class.template.html",
	    controller: ClassController
		});

ClassController.$inject = ['$routeParams', 'dataFactory', 'update', 'classesService'];
function ClassController($routeParams, dataFactory, update, classesService) {
	var self = this;
	var classid = $routeParams.classid;

	classesService.get().$promise.then(function () {
		self.class = classesService.getClass(classid);
		classesService.getParticipants(classid, self.class.sessions);
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
}
