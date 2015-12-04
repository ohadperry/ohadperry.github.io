// AnalyticsAPI


(function($) {

    var AnalyticsAPI = {

        CLIENT_ID: '1087516258196.apps.googleusercontent.com',
        SCOPES: ['https://www.googleapis.com/auth/analytics.readonly'],
        modal: {

        },

        init: function() {

            AnalyticsAPI.authorize();
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
                    AnalyticsAPI.queryAccounts();
                }
            });
        },


        queryAccounts: function() {
            // Load the Google Analytics client library.
            gapi.client.load('analytics', 'v3').then(function() {

                // Get a list of all Google Analytics accounts for this user
                gapi.client.analytics.management.accounts.list().then(AnalyticsAPI.handleAccounts);
            });
        },

        handleAccounts: function(response) {
            // Handles the response from the accounts list method.
            if (response.result.items && response.result.items.length) {
                // Get the first Google Analytics account.
                var firstAccountId = response.result.items[0].id;

                // Query for properties.
                AnalyticsAPI.queryProperties(firstAccountId);
            } else {
                console.log('No accounts found for this user.');
            }
        },


        queryProperties: function(accountId) {
            // Get a list of all the properties for the account.
            gapi.client.analytics.management.webproperties.list(
                {'accountId': accountId})
                .then(AnalyticsAPI.handleProperties)
                .then(null, function(err) {
                    // Log any errors.
                    console.log(err);
                });
        },


        handleProperties: function(response) {
            // Handles the response from the webproperties list method.
            if (response.result.items && response.result.items.length) {

                // Get the first Google Analytics account
                var firstAccountId = response.result.items[0].accountId;

                // Get the first property ID
                var firstPropertyId = response.result.items[0].id;

                // Query for Views (Profiles).
                AnalyticsAPI.queryProfiles(firstAccountId, firstPropertyId);
            } else {
                console.log('No properties found for this user.');
            }
        },


        queryProfiles: function(accountId, propertyId) {
            // Get a list of all Views (Profiles) for the first property
            // of the first Account.
            gapi.client.analytics.management.profiles.list({
                'accountId': accountId,
                'webPropertyId': propertyId
            })
                .then(AnalyticsAPI.handleProfiles)
                .then(null, function(err) {
                    // Log any errors.
                    console.log(err);
                });
        },


        handleProfiles: function(response) {
            // Handles the response from the profiles list method.
            if (response.result.items && response.result.items.length) {
                // Get the first View (Profile) ID.
                var firstProfileId = response.result.items[0].id;

                // Query the Core Reporting API.
                AnalyticsAPI.queryCoreReportingApi(firstProfileId);
            } else {
                console.log('No views (profiles) found for this user.');
            }
        },


        queryCoreReportingApi: function(profileId) {
            // Query the Core Reporting API for the number page views for
            // the past seven days.
            gapi.client.analytics.data.ga.get({
                'ids': 'ga:' + profileId,
                'start-date': '7daysAgo',
                'end-date': 'today',
                'metrics': 'ga:pageviews'
            })
                .then(function(response) {
                    console.log(response.result);
                    console.log(response.result.rows);

                })
                .then(null, function(err) {
                    // Log any errors.
                    console.log(err);
                });
        },

    };

    window.AnalyticsAPI = AnalyticsAPI;

    $(document).ready(function() {
        // TODO - condition by loading of
        // google analytics and not 2 secs hard coded
        setTimeout(AnalyticsAPI.init, 2000);
    });

})(jQuery);

