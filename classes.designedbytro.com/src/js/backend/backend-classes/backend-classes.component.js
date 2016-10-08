angular.
module('backendClasses').
component('backendClasses', {
  templateUrl: 'backend-classes.template.html',
  controller: ['dataFactory', '$q', 'classesService', function ParticipantsController(dataFactory, $q, classesService) {
    var self = this;

    dataFactory.getCategories().then(function(response) {
      self.categories = response.data;
    });

    self.classes = classesService.get();

    self.add = classesService.addClass;
    self.removeClass = classesService.removeClass;

    self.update = function() {
      classesService.updateClass(self.class);
    };

    self.dateObject = function(date) {
      return(new Date(date));
    };

    self.dateTime = function(date) {
      return(date.getTime());
    };

    self.types = ['Class', 'Workshop', 'Open Studio', 'Private'];
  }]
})
.
component('backendClass', {
  templateUrl: 'backend-class.template.html',
  controller: ['dataFactory', '$routeParams', 'classFunctions', function ParticipantsController(dataFactory, $routeParams, classFunctions) {
    var self = this;

    dataFactory.getCategories().then(function(response) {
      self.categories = response.data;
    });

    self.classid = $routeParams.classid;

    if(typeof(self.classid) !== 'undefined') {
      self.class = dataFactory.classes.get({id:self.classid});
      self.class.$promise.then(function(response){
        classFunctions.participants(self.classid, self.class.sessions);
      });
    } else {
      self.classes = dataFactory.classes.query();
    }



    self.add = function(newClassTitle) {
      newclass = dataFactory.classes.save({title: newClassTitle});

      newclass.$promise.then(function(response) {
        self.classes.push(newclass);
      });

    };

    self.update = function() {
      self.class.$update();
    };

    self.imageUpload = function(size) {
      cloudinary.openUploadWidget({ cloud_name: 'designedbytro', upload_preset: 'classes'},
      function(error, result) {
        console.log(error, result);
          image = result[0];
          if (typeof self.class.images == 'undefined') {
            self.class.images = {};
          }
          self.class.images[size] = image.public_id;
          self.class.$update();
      });
    };

    self.dateObject = function(date) {
      return(new Date(date));
    };

    self.dateTime = function(date) {
      return(date.getTime());
    };

    self.addSession = function() {
      if (typeof self.class.sessions == 'undefined') {
        self.class.sessions = [];
      }

      newId = dataFactory.id.get();

      newId.$promise.then(function(response) {
        newSession = {
          class: self.class.id,
          id: newId.id
        };

        self.class.sessions.push(newSession);
        self.class.$update();
        });

    };

    self.removeSession = function(index) {
      title = self.class.sessions[index].title;
      response = confirm("Delete " + title + "?");

      if(!response) {
        return;
      }

      self.class.sessions.splice(index, 1);
      self.class.$update();
    };

    self.types = ['Class', 'Workshop', 'Open Studio', 'Private'];


    self.panel = -1;
  }]
});
