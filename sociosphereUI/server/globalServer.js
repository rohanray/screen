  Meteor.startup(function () {

    // code to run on server at startup

    TwitterFollowersIDsCollecions = new Mongo.Collection("twitterFollowersIDs");


    Twit = new TwitMaker({
        consumer_key:         'meRXTbLWIqynVyvzernnLebcF',
        consumer_secret:      'bqJYSG8waukaUjvdfJIwUaRHpL3ugBGOAnUYVGik7UlhFyxt4O',
        access_token:         '78599376-m8ciSwUVrRxb9PRfj8boIoPLdYUmWbGVniBMSRCVi',
        access_token_secret:  'oonfjCcp2Kvws6WuZK4yBTtgASOqWCjzhhQmUnYBgwAfw'
    });

    Meteor.methods({

      displayTwitterFollowersIDsCollecions: function(){

        Twit.get('followers/ids', { screen_name: 'rohanray' },  function (err, data, response) {
        return data;

        });

      }
    });

  });
