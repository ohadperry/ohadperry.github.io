$(function() {
    var Main = {

        products: {},
        markets: {},

        init: function () {
            //all init data
            Main.initDropDowns();
        },

        //TODO get data from the backend for this
        //TODO - save in backend in local cache for with Expiry
        initDropDowns: function(){

            for(var i=0; i<100; i++){
                Main.products['product'+i] ='product'+i;
                Main.markets['market'+i] ='market'+i;
            }



            var productsSelect = $('#product select');
            $.each(Main.products, function(val, text) {
                productsSelect.append(
                    $('<option></option>').val(val).html(text)
                );
            });
            var marketSelect = $('#market select');
            $.each(Main.markets, function(val, text) {
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