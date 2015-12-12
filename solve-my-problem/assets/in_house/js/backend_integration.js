$(function() {
    var Backend = {

        init: function () {

            Backend.init_app();
        },

        init_app: function(){
            Parse.initialize("2dFgWLAPHrXIBU3SQ7I1j3q0ErhR0UcbIMNXg3LP",
                "qe0M53EBz8dZJGfpmWG4N67zWsmtayKhbO6CPKOg");

            var query = new Parse.Query(Parse.Problem);
            query.find({
                success: function(users) {
                    for (var i = 0; i < users.length; ++i) {
                        console.log(users[i].get('username'));
                    }
                }
            });

        }
    };

    window.Backand = Backend;

    $(document).ready(function() {
        Backend.init();
    });

});