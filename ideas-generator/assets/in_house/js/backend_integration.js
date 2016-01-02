$(function() {
    var Backend = {

        init: function () {

            Backend.init_app();
        },

        init_app: function(){
            Parse.initialize("joJWvXlElhJPpLF6eOOdfqDrwaoVtW8XmX1CIu5X",
                "iMoQVCMmr6KkczypWVwtiNKm8G6fBeZ3hYVDikDN");
        }
    };

    window.Backand = Backend;

    $(document).ready(function() {
        Backend.init();
    });

});