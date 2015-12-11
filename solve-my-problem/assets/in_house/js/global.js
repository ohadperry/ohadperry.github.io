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
                Global.disableSubmitButton();
                //TODO send the data
                //after data sent confirmation, change to the thank you page
                window.location.replace("#/thank-you");

            });
        },

        disableSubmitButton: function(){
            $('#solve-it-btn').html('Sending ... ').prop('disabled', true);
        },

        //enableSubmitButton: function(){
        //    $('#solve-it-btn').html('Solve it for me').prop('disabled', false);
        //},
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