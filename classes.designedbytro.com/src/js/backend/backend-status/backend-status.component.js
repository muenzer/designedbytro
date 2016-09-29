angular.
module('backendStatus').
component('backendStatus', {
	templateUrl: 'backend-status.template.html',
	controller: ['dataFactory', 'STATUS', function StatusController(dataFactory, STATUS) {
		var self = this;

		var today = Date.now();

		self.participants = dataFactory.participants.query();

		self.participants.$promise.then(function() {
			self.registered = self.participants.filter(function(item){
				return item.PaymentStatus == 'Registered' && item.DueDate;
			});
			for(var i in self.registered) {
				if(self.registered[i].DueDate < today) {
					self.registered[i].overdue = {"color": "red"};
				}
			}

			self.overdue = self.participants.filter(function(item){
				return item.PaymentStatus == 'Overdue';
			});
			for(i in self.overdue) {
				if(self.overdue[i].DueDate < today) {
					self.overdue[i].overdue = {"color": "red"};
				}
			}
		});

		self.statusOptions = STATUS.OPTIONS;

		self.update = function update(item) {
      response = confirm("Confrim Status Change");

      if(!response) {
        return;
      }

      if(item.PaymentStatus == 'Delete') {
        dataFactory.participants.delete({coursesession: item.CourseSession, emailaddress: item.EmailAddress});
        return;
      }

      var data = self.updateStatus(item, item.PaymentStatus);

      dataFactory.participants.update({coursesession:item.CourseSession,
        emailaddress: item.EmailAddress}, data);
      };
	}]
	// controller: ['apiService', function StatusController(apiService) {
	// 	var self = this;
	//
	// 	var today = Date.now();
	//
	// 	apiService.GetStatus('Registered').
	// 	then(function(response){
	// 		self.registered = response.data.Items;
	// 		for(var i in self.registered) {
	// 			self.registered[i].newStatus = self.registered[i].PaymentStatus;
	// 			if(self.registered[i].DueDate < today) {
	// 				self.registered[i].overdue = {"color": "red"};
	// 			}
	// 		}
	// 	});
	//
	// 	apiService.GetStatus('Overdue').
	// 	then(function(response){
	// 		self.overdue = response.data.Items;
	// 		for(var i in self.overdue) {
	// 			self.overdue[i].newStatus = self.overdue[i].PaymentStatus;
	// 			self.overdue[i].overdue = {"color": "red"};
	// 		}
	// 	});
	//
	// 	self.statusOptions = apiService.statusOptions;
	//
	// 	self.update = function update(item) {
	// 		if(item.newStatus == item.PaymentStatus) {
	// 			return;
	// 		}
	//
	// 		switch(item.newStatus) {
	// 			case "Registered":
	// 			if(item.PaymentStatus == 'Wait List') {
	// 				apiService.Register(item);
	// 			}
	// 			break;
	// 			case "Overdue":
	// 			apiService.Overdue(item);
	// 			break;
	// 			case "Delete":
	// 			apiService.Delete(item);
	// 			break;
	// 			case "Confirmed":
	// 			if(item.PaymentStatus == 'Registered') {
	// 				apiService.Confirm(item);
	// 			}
	// 			break;
	// 			case "Unenrolled":
	// 			apiService.Unenroll(item);
	// 			break;
	// 		}
	// 	};
	// }]
});
