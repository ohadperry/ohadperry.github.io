$(function() {
    var Global = {

        Templates: {},

        init: function () {

            //all init data
            Global.bindFaqClick();
        },

        init1: function(){
            p('initiated the foo and the bar, happy.');

        },

        //open faq popup on click
        bindFaqClick: function(){
           $('#why-link').on('click', function(){
               BootstrapDialog.alert({
                   title: 'faq',
                   message: $('<div></div>').load('templates/faq.html.erb')
               });
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