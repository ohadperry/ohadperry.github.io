$(function() {
    var Global = {

        Templates: {},

        init: function () {


            //all init data
            Global.init1();
        },

        init1: function(){
            p('initiated the foo and the bar, happy.');

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