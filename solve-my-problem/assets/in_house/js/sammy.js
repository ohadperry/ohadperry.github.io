$(function() {
    var Sammy = {

        init: function () {

            Sammy.setUpRoutes();
        },

        setUpRoutes: function(){
            var app = $.sammy(function() {

                this.get('#/', function() {
                    $("#main-block").load("templates/first-page.html.erb", function(){
                        Global.init();
                    });

                });


                this.get('#/thank-you', function() {
                    $("#main-block").load("templates/thank-you.html.erb");
                });

            });

            // start the application
            app.run('#/');
        }
    };

    window.Sammy = Sammy;

    $(document).ready(function() {
        Sammy.init();
    });

});