angular.module('classFunctions')
.service('classFunctions', ['dataFactory', function(dataFactory) {
  this.date = function(classes) {
    classes.forEach(function(item) {
      item.earliestDate = Infinity;
      if(typeof(item.sessions) === 'undefined') {
        return;
      }
      item.sessions.forEach(function(session) {
        if (!session.disabled & session.date < item.earliestDate) {
          item.earliestDate = session.date;
        }
      });
    });
  };

  function countParticipants(participants) {
    var count = participants.filter(function(item) {
       return item.PaymentStatus != "Unenrolled";
    }).reduce( function( acc, cur ) {
      return acc + parseInt(cur.Number);
    }, 0 );

    return count;
  }

  this.countParticipants = countParticipants;

  function waitlist(totalSize, size) {
    if(totalSize >= size) {
      return true;
    } else {
      return false;
    }
  }

  this.waitlist = waitlist;

  this.participants = function(classid, sessions) {
    angular.forEach(sessions, function(session){

      var classsession = classid + "#" + session.id;
      //load participants
      session.participants = dataFactory.participants.query({coursesession:classsession});

      session.participants.$promise.then(function(response) {
        //count total participants, expect unenrolled
        session.totalSize = countParticipants(session.participants);
        //check for waitlist
        session.waitlist = waitlist(session.totalSize, session.size);
      });
    });
  };
}]);
