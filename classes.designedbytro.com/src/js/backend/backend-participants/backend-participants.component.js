angular.
module('backendParticipants').
component('backendParticipants', {
  bindings: {participants: '='},
  templateUrl: 'backend-participants.template.html',
  controller: ['dataFactory', 'STATUS', 'update', function ParticipantsController(dataFactory, STATUS, update) {
    var self = this;

    self.updateStatus = update.status;

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
  });
