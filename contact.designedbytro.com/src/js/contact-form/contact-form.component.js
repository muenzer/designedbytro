angular.
module('contactForm').
component('contactForm',{
  templateUrl: "contact-form.template.html",
  controller: ['dataFactory', function ContactFormController(dataFactory) {
      var self = this;

      self.contact = {};
      self.alert = false;

      self.submit = function() {
        dataFactory.contact.save(self.contact);
        self.alert = true;
        console.log(self.contact);
      }
  }]
});
