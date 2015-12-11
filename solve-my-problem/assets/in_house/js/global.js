$(function() {
    var Global = {

        Templates: {},

        init: function () {

            Global.bindFaqClick();
            Global.bindFormSubmit();
        },

        //open faq popup on click
        bindFaqClick: function(){
           $('.why-link-js').on('click', function(){
               BootstrapDialog.alert({
                   title: 'FAQ',
                   message: $('<div></div>').load('templates/faq.html.erb')
               });
           });
        },

        bindFormSubmit: function(){
            $('.solve-it-js').on('click', function(){
                //TODO data validation
                Global.dataValidationBeforeSending();
                Global.disableSubmitButton();
                //TODO send the data
                Global.sendTheData();
            });
        },

        disableSubmitButton: function(){
            $('#solve-it-btn').html('Sending ... ').prop('disabled', true);
        },

        //enableSubmitButton: function(){
        //    $('#solve-it-btn').html('Solve it for me').prop('disabled', false);
        //},

        dataValidationBeforeSending: function(){
            var errors = [],
                possibleChecks = ['problem-description', 'error'];

            // clear past errors
            $.each(possibleChecks, function(_, possibleCheck){
                $('#error-' +possibleCheck).empty()
            });

            //check for new errors
            if ($('#problem-description').val().length < 6) {
                errors.push({'id': 'problem-description', errorMessage: '6 letters minimum.'})
            }

            if (!Global.isEmail($('#email').val())) {
                errors.push({'id': 'email', errorMessage: 'Please enter a valid email.'})
            }

            if (errors.length > 0){
                $.each(errors, function(_, errorData){
                   // add the error text to the html here
                    $('#error-' + errorData.id).html(errorData.errorMessage)
                });
                throw "Cant sent form , has errors"
            }
        },

        sendTheData: function(){
            //after data sent confirmation, change to the thank you page
            window.location.replace("#/thank-you");
        },

         isEmail: function(email) {
             var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             return regex.test(email);
         }

    };

    window.Global = Global;

    $(document).ready(function() {
        //global easy to use methods
        function p(message){
            console.log(message);
        }

        window.p = p;

        Global.init();
    });

});