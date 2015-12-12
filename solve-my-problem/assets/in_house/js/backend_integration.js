$(function() {
    var Backend = {

        init: function () {

            Backend.init_app();
        },

        init_app: function(){
            angular.module('YOUR-APP-NAME', ['backand'])

        }
    };

    window.Backand = Backend;

    $(document).ready(function() {
        Backend.init();
    });

});