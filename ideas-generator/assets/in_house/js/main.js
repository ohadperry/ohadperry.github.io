$(function() {
    var Main = {

        init: function () {
            //all init data
            Main.initDropDowns();
        },

        //TODO get data from the backend for this
        initDropDowns: function(){
            var products = {},
                markets = {};

            for(var i=0; i<100; i++){
                products['product'+i] ='product'+i;
                markets['market'+i] ='market'+i;
            }

            var productsSelect = $('#product select');
            $.each(products, function(val, text) {
                productsSelect.append(
                    $('<option></option>').val(val).html(text)
                );
            });
            var marketSelect = $('#market select');
            $.each(markets, function(val, text) {
                marketSelect.append(
                    $('<option></option>').val(val).html(text)
                );
            });
        },


    };

    window.Main = Main;

    $(document).ready(function() {
        //global easy to use methods
        function p(message){
            console.log(message);
        }

        window.p = p;

        Main.init();
    });

});