// AnalyticsAPI

//http://stackoverflow.com/questions/31652230/using-filters-parameter-in-google-api-request-always-results-in-an-error
(function($) {

    var AnalyticsAPI = {

        CLIENT_ID: '1087516258196.apps.googleusercontent.com',
        SCOPES: ['https://www.googleapis.com/auth/analytics.readonly'],
        modal: {

        },

        init: function() {

            if (gapi.auth == undefined){
                console.log('not ready yet');
                setTimeout(AnalyticsAPI.init, 700);
            }else{
                AnalyticsAPI.authorize();
            }
        },

        authorize: function(event) {
            // Handles the authorization flow.
            // `immediate` should be false when invoked from the button click.
            var useImmdiate = event ? false : true;
            var authData = {
                client_id: AnalyticsAPI.CLIENT_ID,
                scope: AnalyticsAPI.SCOPES,
                immediate: useImmdiate
            };

            gapi.auth.authorize(authData, function(response) {
                if (response.error) {
                    console.log(response.error)
                }
                else {
                    AnalyticsAPI.queryCoreReportingApi('bla', 7);
                    AnalyticsAPI.queryCoreReportingApi('bla', 30);
                    AnalyticsAPI.queryRealTimeApi('bla');
                }
            });
        },

        queryCoreReportingApi: function(profileId, daysAgo) {
            // Query the Core Reporting API for the number page views for
            // the past seven days.
            gapi.client.analytics.data.ga.get({
                'ids': 'ga:104744699',
                'start-date': daysAgo+ 'daysAgo',
                'end-date': 'today',
                'metrics': 'ga:pageviews'
            })
            .then(function(response) {
                if (7 == daysAgo){
                    $('#pageviews-last-week').text(response.result.rows[0]);
                }else if (30 == daysAgo){
                    $('#pageviews-last-month').text(response.result.rows[0]);
                }
            })
            .then(null, function(err) {
                // Log any errors.
                console.log(err);
            });
        },

        queryRealTimeApi: function(profileId) {
            // Query the Core Reporting API for the number page views for
            // the past seven days.
            gapi.client.analytics.data.realtime.get({
                ids:'ga:104744699',
                metrics:'rt:activeUsers'
            }).then(function(response) {
                var activeUsers = parseInt(response.result.rows[0]);
                if (activeUsers > 0){
                   $('#active-users').html('Active Users Right Now: <span>'+activeUsers+'</span>')
                }else{
                    console.log('no active users right now')
                }

            }).then(null, function(err) {
                // Log any errors.
                console.log(err);
            });
        },


    };

    window.AnalyticsAPI = AnalyticsAPI;

    $(document).ready(function() {
        AnalyticsAPI.init();
    });

})(jQuery);

