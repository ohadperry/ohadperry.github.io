$(function() {
    var Global = {

        Email: undefined,

        init: function () {

            //Global.bindFaqClick();
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
            $('#notify-me').on('click', function(){
                Global.formSubmit()
            });

            $('#notify-form').bind('keypress', function(e) {
                var code = e.keyCode || e.which;
                if(code == 13) { //'Enter' keycode
                    Global.formSubmit();
                }

            });

            //TODO - also submit on 'enter' key
        },

        formSubmit: function(){
            Global.dataValidationBeforeSending();
            Global.disableSubmitButton();
            Global.sendTheData();
        },

        disableSubmitButton: function(){
            $('#notify-me').html('Sending ... ').prop('disabled', true);
        },

        //enableSubmitButton: function(){
        //    $('#solve-it-btn').html('Solve it for me').prop('disabled', false);
        //},

        dataValidationBeforeSending: function(){
            var errors = [],
                possibleChecks = ['email'];

            // clear past errors
            $.each(possibleChecks, function(_, possibleCheck){
                $('#error-' +possibleCheck).empty()
            });

            //check for new errors
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
            var email = $('#email').val();

            var Email = Parse.Object.extend('Emails');
            var user = new Email();

            user.set("email", email);

            user.save(null, {
                success: function(user) {
                    //TODO send a google analytics event here
                    console.log('New object created with objectId: ' + user.id);
                    //after data sent confirmation, change to the thank you page
                    Global.Email = email;
                    window.location.replace("#/thank-you");
                },
                error: function(user, error) {
                    //TODO send a google analytics event here
                    console.log('Failed to create new object, with error code: ' + error.message);
                    //TODO error message to user
                    BootstrapDialog.alert({message:"We couldn't process that, please try again later.",
                        type: BootstrapDialog.TYPE_WARNING,
                        title: "We are so sorry"})
                }
            });


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