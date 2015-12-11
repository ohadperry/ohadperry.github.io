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
                   title: 'faq',
                   message: $('<div></div>').load('templates/faq.html.erb')
               });
           });
        },

        bindFormSubmit: function(){
            $('.solve-it-js').on('click', function(){
                //TODO data validation
                //TODO send the data
                //after data sent confirmation, change to the thank you page

            });
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