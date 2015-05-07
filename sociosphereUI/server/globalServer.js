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

    getTwitterFollowersIDsCollectionsClient : function (screenname, twtr_nxt_crsr_prm){
      Meteor.setTimeout(function(screenname){

        var dataTemp;

        T.get('followers/list', { screen_name: screenname, cursor: twtr_nxt_crsr_prm }, Meteor.bindEnvironment(function (err, data, response) {
        
        console.log("from getTwitterFollowersIDsCollectionsClient : ");
        //console.log(data);

        dataTemp=data;

        var vids=dataTemp.users;
        for(var i in vids)
          {

            console.log("for loop : "+vids[i].name);
            TwitterFollowersIDsCollecions.insert({
              twitterFollowerID:vids[i].id_str
            });

            TwitterFollowersDetailsCollecions.insert({
              twitterFollowerID:vids[i].id_str,
              twitterFollowerScreenName:vids[i].screen_name,
              twitterFollowerName:vids[i].name,
              twitterFollowerProfilePicURL:vids[i].profile_image_url

            });
          }

          var twtr_nxt_crsr_var=dataTemp.next_cursor_str;

          console.log("data.next_cursor_str : "+twtr_nxt_crsr_var);

          if (twtr_nxt_crsr_var != "0") {
            console.log("CALLING AGAIN!!!");
            Meteor.call('getTwitterFollowersIDsCollectionsClient',screenname,twtr_nxt_crsr_var);
          }

      }));



          /*if (twtr_nxt_crsr_var != "0") {
            Meteor.call('getTwitterFollowersIDsCollectionsClient',screenname,twtr_nxt_crsr_var);
          }*/

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