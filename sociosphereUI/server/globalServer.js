Meteor.startup(function () {

  s.slugify("Hello world!");
  
  // code to run on server at startup

  var Twit = Meteor.npmRequire('twit');

  var T = new Twit({
        consumer_key:         'meRXTbLWIqynVyvzernnLebcF',
        consumer_secret:      'bqJYSG8waukaUjvdfJIwUaRHpL3ugBGOAnUYVGik7UlhFyxt4O',
        access_token:         '78599376-m8ciSwUVrRxb9PRfj8boIoPLdYUmWbGVniBMSRCVi',
        access_token_secret:  'oonfjCcp2Kvws6WuZK4yBTtgASOqWCjzhhQmUnYBgwAfw'
    });

  Meteor.methods({

    //this is server method for posting  a new tweet - PURE TEXT
    postMyNewTweet: function(tweetText){
      Meteor.setTimeout(function(tweetText){

        T.post('statuses/update', { status: '#nodejs #meteor #helloworld!' }, function(err, data, response) {
          console.log(data);
        });

      });

    },

    //this is server method for live retrieval of user timelines i.e all my tweets and retweets and all corresponding details and storing in local mongo

    getAllMyTweetsDetailsCollections : function (screenname){
      Meteor.setTimeout(function(screenname){
        var dataTemp;
        T.get('statuses/user_timeline', { screen_name: screenname, count: 200, exclude_replies:false, contributor_details: true, include_rts: true},
          Meteor.bindEnvironment(function(err, data, response){
            console.log("getAllMyTweetsDetailsCollections");
            //console.log(data);
            dataTemp=data;

            for(var i in dataTemp){

              console.log("tweet text:");
              console.log(dataTemp[i].text);

              var isRetweetedStatus=dataTemp[i].retweeted_status;
              var isMytweet=false;
              
              console.log("isRetweetedStatus k value");
              console.log(isRetweetedStatus);
              
              if (typeof isRetweetedStatus == 'undefined') {
                  isMytweet=true;
                  console.log("is it my tweet");
                  console.log(isMytweet);
              }

              if(isMytweet){
                TwitterAllMyTweetsCollections.insert({
                  createdAt:dataTemp[i].created_at,
                  tweetIdString:dataTemp[i].id_str,
                  tweetText:dataTemp[i].text,
                  retweetCount:dataTemp[i].retweet_count,
                  favoriteCount:dataTemp[i].favorite_count,
                  tweetFrom:dataTemp[i].user.screen_name
                });
              }

              else{
                TwitterAllMyTweetsCollections.insert({
                  createdAt:dataTemp[i].created_at,
                  tweetIdString:dataTemp[i].id_str,
                  tweetText:dataTemp[i].retweeted_status.text,
                  retweetCount:dataTemp[i].retweet_count,
                  favoriteCount:dataTemp[i].favorite_count,
                  tweetFrom:dataTemp[i].retweeted_status.user.screen_name

                });
              }

              /*var parsedTweetText=dataTemp[i].text;
              var tweetFromWhom="@rohanray";
              var tweetFromMe=!(s.startsWith(parsedTweetText, "RT @"));

              if(!tweetFromMe){
                //parsedTweetText="not from me";
                parsedTweetText=dataTemp[i].retweeted_status.text;
                tweetFromWhom=dataTemp[i].retweeted_status.user.screen_name;

              }*/

              
            }
          }));
        return;
      });
    },

    // this is the server method called from the client for live retrieval of twitter followers ids alongwith details and storing in local mongo

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
    },

    getFacebookFeedsIDsCollectionsClient : function(){



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