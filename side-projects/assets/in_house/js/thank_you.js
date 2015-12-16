$(function() {
    var ThankYou = {

        init: function () {

        },

        bindFeedbackSubmit: function() {
            $('#feedback-button').on('click', function(){
                ThankYou.dataValidationBeforeSending();
                ThankYou.disableSubmitButton();
                ThankYou.sendTheData();

            })
        },

        disableSubmitButton: function(){
            $('#feedback-button').html('Sending ... ').prop('disabled', true);
        },


        dataValidationBeforeSending: function(){
            var errors = [],
                possibleChecks = ['integer-feedback', 'free_text'];

            // clear past errors
            $.each(possibleChecks, function(_, possibleCheck){
                $('#error-' +possibleCheck).empty()
            });


            //check for new errors
            if ($('input[name="feedback-radio"]:checked').length < 1) {
                errors.push({'id': 'integer-feedback', errorMessage: 'בחר לפחות אחד'})
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
            var productLove = parseInt($('input[name=feedback-radio]:checked').val()),
                free_text = $('#free_text').val(),
                email = Global.Email,
                Feedback = Parse.Object.extend('Feedback'),
                feedback = new Feedback();

            feedback.set("productLove", productLove);
            feedback.set("free_text", free_text);
            feedback.set("email", email);

            feedback.save(null, {
                success: function(feedback) {
                    //TODO send a google analytics event here
                    console.log('New object created with objectId: ' + feedback.id);
                    //after data sent confirmation, change to the thank you page
                    window.location.replace("#/feedback-thank-you");
                },
                error: function(user, error) {
                    //TODO send a google analytics event here
                    console.log('Failed to create new object, with error code: ' + error.message);
                    BootstrapDialog.alert({message:"We couldn't process that, please try again later.",
                        type: BootstrapDialog.TYPE_WARNING,
                        title: "We are so sorry"})
                }
            });

        },
    };

    window.ThankYou = ThankYou;

    $(document).ready(function() {

        ThankYou.init();
    });

});