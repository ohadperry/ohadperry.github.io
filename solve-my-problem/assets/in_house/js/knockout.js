$(function() {
    var Sammy = {

        init: function () {

            Sammy.init();
        },

        init1: function(){
            p('initiated the foo and the bar, happy.');
        }
    };

    window.Sammy = Sammy;

    $(document).ready(function() {

        Sammy.init();
    });

});