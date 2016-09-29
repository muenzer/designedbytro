/**
 * angular-mailchimp
 * http://github.com/keithio/angular-mailchimp
 * License: MIT
 */

  /**
   * Form controller for a new Mailchimp subscription.
   */
   function MailchimpSubscriptionCtrl($log, $resource) {
    // Handle clicks on the form submission.
    this.addSubscription = function (mailchimp) {
      var actions,
      MailChimpSubscription,
      params = {},
      url;

      // Create a resource for interacting with the MailChimp API
      url = '//' + mailchimp.username + '.' + mailchimp.dc +
      '.list-manage.com/subscribe/post-json';

      var fields = Object.keys(mailchimp);

      for(var i = 0; i < fields.length; i++) {
        params[fields[i]] = mailchimp[fields[i]];
      }

      params.c = 'JSON_CALLBACK';

      actions = {
        'save': {
          method: 'jsonp'
        }
      };
      MailChimpSubscription = $resource(url, params, actions);

      // Send subscriber data to MailChimp
      MailChimpSubscription.save(
        // Successfully sent data to MailChimp.
        function (response) {
          // Define message containers.
          mailchimp.errorMessage = '';
          mailchimp.successMessage = '';

          // Store the result from MailChimp
          mailchimp.result = response.result;

          // Mailchimp returned an error.
          if (response.result === 'error') {
            if (response.msg) {
              // Remove error numbers, if any.
              var errorMessageParts = response.msg.split(' - ');
              if (errorMessageParts.length > 1)
                errorMessageParts.shift(); // Remove the error number
              mailchimp.errorMessage = errorMessageParts.join(' ');
            } else {
              mailchimp.errorMessage = 'Sorry! An unknown error occured.';
            }
          }
          // MailChimp returns a success.
          else if (response.result === 'success') {
            mailchimp.successMessage = response.msg;
          }
        },

        // Error sending data to MailChimp
        function (error) {
          $log.error('MailChimp Error: %o', error);
        }
        );
    };
  }

  angular.
  module('mailchimp').
  component('signupForm', {
    controller: ['$log', '$resource', MailchimpSubscriptionCtrl],
    templateUrl: 'mailchimp-signup-form.template.html'
  });

