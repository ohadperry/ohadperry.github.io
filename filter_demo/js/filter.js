// BackofficeFilter


(function($) {

    var BackofficeFilter = {

        modal: {

        },

        init: function() {

            this.initFilter();
        },

        initFilter: function(){

            devicesOptions = [
                {name: 'LGE', value: 'server_id1_value'},
                {name: 'Apple', value: 'server_id2_value'},
                {name: 'Samsung', value: 'server_id3_value'}],
                productOptions = [
                    {name: 'Product Name 1', value: 'product_name_1', selected: true},  //selected on display
                    {name: 'Product Name 2', value: 'product_name_2'},
                    {name: 'Product Name 3', value: 'product_name_3'},
                    {name: 'Product Name 4', value: 'product_name_4'},
                    {name: 'Product Name 5', value: 'product_name_5'},
                    {name: 'Product Name 6', value: 'product_name_6'},
                ],
                filter1Options = [
                    {name: 'Filter 1 Option 1', value: 'server_id1_value', date: "22-05-2015"},
                    {name: 'Filter 1 Option 2', value: 'server_id2_value', date: "22-06-2015"},
                    {name: 'Filter 1 Option 3', value: 'server_id3_value', date: "22-06-2015"},
                    {name: 'Filter 1 Option 4', value: 'server_id4_value', date: "22-06-2015"},
                    {name: 'Filter 1 Option 5', value: 'server_id5_value', date: "22-03-2015"},
                    {name: 'Filter 1 Option 6', value: 'server_id6_value', date: "22-02-2015"},
                    {name: 'Filter 1 Option 7', value: 'server_id7_value', date: "22-04-2015"},
                    {name: 'Filter 1 Option 8', value: 'server_id8_value', date: "22-03-2015"},
                    {name: 'Filter 1 Option 9', value: 'server_id9_value', date: "22-02-2015"},
                    {name: 'Filter 1 Option 10', value: 'server_id10_value', date: "22-02-2015"},
                    {name: 'Filter 1 Option 11', value: 'server_id11_value', date: "22-02-2015"},
                ],
                operatingSystemOptions = [
                    {name: 'ios', value: 'ios'},
                    {name: 'android', value: 'android'},
                    {name: 'windows', value: 'windows'},
                ],
                filter2Options = [
                    {name: 'yes', value: true},
                    {name: 'no', value: false}
                ],
                filter3Options = [
                    {name: 'Filter 3 Option 1', value: 'server_id1_value', date: "22-06-2015"},
                    {name: 'Filter 3 Option 2', value: 'server_id2_value', date: "22-06-2015"},
                    {name: 'Filter 3 Option 3', value: 'server_id2_value', date: "22-07-2015"},
                    {name: 'Filter 3 Option 4', value: 'server_id3_value', date: "22-03-2015"},
                    {name: 'Filter 3 Option 5', value: 'server_id4_value', date: "22-03-2015"},
                    {name: 'Filter 3 Option 6', value: 'server_id5_value', date: "22-03-2014"},
                    {name: 'Filter 3 Option 7', value: 'server_id6_value', date: "22-03-2012"},
                    {name: 'Filter 3 Option 8', value: 'server_id7_value', date: "22-02-2015"}],
                filter4Options = [
                    {name: 'Filter 4 Option 1', value: 'server_id1_value'},
                    {name: 'Filter 4 Option 2', value: 'server_id2_value'},
                    {name: 'Filter 4 Option 3', value: 'server_id3_value'},
                    {name: 'Filter 4 Option 4', value: 'server_id4_value'}
                ],
                operatingSystemVersionOptions = [
                    {name: '8.1 (ios)', value: 'server_id1_value'},
                    {name: '8.2 (ios)', value: 'server_id2_value'},
                    {name: '5.5 (kitkat)', value: 'server_id3_value'}
                ],
                options = {
                    title: 'Simple Filter',
                    dateFormat: this.dateFormat,
                    searchClickedCallback: BackofficeFilter.sendToServer,
                    filterParameters: [
                        {type: 'text', attributeName: 'subject_id', name: 'Object ID', placeholder: 'placeholder text here'},
                        {type: 'date-range', attributeName: 'date_range', name: 'Date Range'},
                        {type: 'single', attributeName: 'productName',name: 'Product', options: productOptions},
                        {type: 'single',  attributeName: 'operating_system', name: 'Operating System', options: operatingSystemOptions},
                        {type: 'multi', attributeName: 'filter_1', name: 'Filter 1', options: filter1Options},
                        {type: 'single', attributeName: 'filter_2', name: 'Filter 2', options: filter2Options},
                        {type: 'multi', attributeName: 'deviceName',name: 'Manufacturer', options: devicesOptions},
                        {type: 'multi', attributeName: 'filter_3', name: 'Filter 3', options: filter3Options},
                        {type: 'multi', attributeName: 'filter4',name: 'Filter 4', options: filter4Options},
                        {type: 'multi', attributeName: 'operating_system_version', name: 'Operating System Options', options: operatingSystemVersionOptions},
                    ]
                };

            $('#filter').bootstrapFilter(options);
        },

        sendToServer: function(data){
            alert('sending params to server: ' + JSON.stringify(data));
        },


    };

    window.BackofficeFilter = BackofficeFilter;

    $(document).ready(function() {
        BackofficeFilter.init();
    });

})(jQuery);

