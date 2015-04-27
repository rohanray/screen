FbFeedsCollecions = new Mongo.Collection("fbFeeds");

if(Meteor.isClient) {

  window.fbAsyncInit = function() {
          FB.init({
            appId      : '406989749482439',
            xfbml      : true,
            version    : 'v2.2',
            status     : true
          });
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email', 'public_profile', 'user_friends','read_stream','user_likes'],
    }

  });


  Template.body.helpers({
    feeds: function () {
      
      return FbFeedsCollecions.find();
  }
  });

    Template.body.events({
    
    "click .hide-completed ": function (event) {
      //Session.set("hideCompleted", event.target.checked);
       FB.getLoginStatus(function(response) {
       if (response.status === 'connected') {
         // the user is logged in and has authenticated your
         // app, and response.authResponse supplies
         // the user's ID, a valid access token, a signed
         // request, and the time the access token 
         // and signed request each expire
         var uid = response.authResponse.userID;
         var accessToken = response.authResponse.accessToken;
         alert(uid);

                FB.api(
             "/me/feed",
             function (response) {
               
               console.log("ray debug");

               if (response && !response.error) {

                varResp = response;

                 //fbFeedsWholeJSON = FB.JSON.stringify(response);
                 fbFeeds = response.data;

                 console.log(fbFeeds);
                 
                 for(var i in fbFeeds)
                 {

                     FbFeedsCollecions.insert({
                       fromName: fbFeeds[i].from.name,
                       message: fbFeeds[i].message,
                       created_Time: fbFeeds[i].created_Time,
                       story: fbFeeds[i].story
                     });
                 }
               }
             }
         );
                
       } else if (response.status === 'not_authorized') {
         alert("not authrzd");
         // the user is logged in to Facebook, 
         // but has not authenticated your app
       } else {
         // the user isn't logged in to Facebook.
         alert("not logged in");
       }
      });


    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
