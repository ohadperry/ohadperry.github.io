$(function() {
    var Main = {

        products: [],
        markets: [],
        randomProduct: '',
        randomMarket: '',

        init: function () {
            //all init data
            Main.initDropDowns();
        },

        //TODO get data from the backend for this
        //TODO - save in backend in local cache for with Expiry
        initDropDowns: function(){

            // TODO get this from the backend
            for(var i=0; i<100; i++){
                Main.products.push('product'+i);
                Main.markets.push('market'+i);
            }

           var randomProductIndex = Main.randomItemIndex(Main.products),
               randomMarketIndex = Main.randomItemIndex(Main.markets),
               optionElement;

           p(randomProductIndex);
           p(randomMarketIndex);

            var productsSelect = $('#product select');
            $.each(Main.products, function(index, text) {
                optionElement = '<option></option>';
                if (randomProductIndex == index){
                    optionElement = '<option selected="selected"></option>';
                }
                productsSelect.append(
                    $(optionElement).val(text).html(text)
                );
            });
            var marketSelect = $('#market select');
            $.each(Main.markets, function(index, text) {
                optionElement = '<option></option>';
                if (randomMarketIndex == index){
                    optionElement = '<option selected="selected"></option>';
                }
                marketSelect.append(
                    $(optionElement).val(text).html(text)
                );
            });
        },

        // a method to select a random item from the products/markets array
        randomItemIndex: function(array){
            return Math.floor(Math.random()*array.length);
        }


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