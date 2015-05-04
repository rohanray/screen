Meteor.startup(function () {

  // code to run on server at startup

  TwitterFollowersIDsCollecions = new Mongo.Collection("twitterFollowersIDs");
  TwitterFollowersDetailsCollecions = new Mongo.Collection("twitterFollowersDetails");

  var Twit = Meteor.npmRequire('twit');

  var T = new Twit({
        consumer_key:         'meRXTbLWIqynVyvzernnLebcF',
        consumer_secret:      'bqJYSG8waukaUjvdfJIwUaRHpL3ugBGOAnUYVGik7UlhFyxt4O',
        access_token:         '78599376-m8ciSwUVrRxb9PRfj8boIoPLdYUmWbGVniBMSRCVi',
        access_token_secret:  'oonfjCcp2Kvws6WuZK4yBTtgASOqWCjzhhQmUnYBgwAfw'
    });

  Meteor.methods({

    // this is the server method called from the client

    getTwitterFollowersIDsCollectionsClient : function (screenname){
      Meteor.setTimeout(function(screenname){
        T.get('followers/list', { screen_name: screenname }, Meteor.bindEnvironment(function (err, data, response) {
        
        console.log("from getTwitterFollowersIDsCollectionsClient : ");
        console.log(data);

        var vids = data.users;
        for(var i in vids)
          {
            //Meteor.call('getTwitterFollowersDetailsCollectionsClient',tempTwtrFlwrID);
            /*TwitterFollowersIDsCollecions.insert({
              twitterFollowerID:vids[i].id_str
            });

            TwitterFollowersDetailsCollecions.insert({
              twitterFollowerID:vids[i].id_str,
              twitterFollowerScreenName:vids[i].screen_name,
              twitterFollowerName:vids[i].name,
              twitterFollowerProfilePicURL:vids[i].profile_image_url

            });*/
          }

        return data;
      }));

      },10);
      return;
    }

    /*getTwitterFollowersDetailsCollectionsClient : function (var_user_id){

      console.log("from getTwitterFollowersDetailsCollectionsClient for id : "+var_user_id);

      Meteor.setTimeout(function(var_user_id){
        T.get('followers/list', { user_id: '75500516'}, Meteor.bindEnvironment(function(err, data, response){
          console.log(response);


        }));
      });
      return;
    }*/

    /*getTwitterFollowersIDsNow : function (screenname) {
      T.get('followers/ids', { screen_name: screenname }, function (err, data, response) {
        console.log("from getTwitterFollowersIDsNow : "+data);

        return data;
      });
    }*/
 
  });

});