//Facebook configs

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
    
    facebook: ['email', 'public_profile', 'user_friends','read_stream','user_likes', 'manage_pages','publish_pages','read_insights']
  }

});
/*
Template.facebookContacts.onCreated(function () {
     

     
});*/
Template.newFacebookPost.events({
  /*'click .newFacebookPostBtn': function (e) {

  },*/

 /* 'submit .new-fb-post':function(e){

    var text = e.target.text.value;
    
    //tempinst=Template.instance();

    //kneweventtest=e;
    alert("captured paper : "+text);

    // Clear form
    e.target.text.value = "";

    return false;

  },*/

  'click .newFacebookPostBtn':function(e){

    var fbPost=Template.instance().find('.fbPost').value;

    alert("captured paper : "+fbPost);

    // Clear form
    Template.instance().find('.fbPost').value="";

    /* make FB API call */

    FB.api('/me/accounts', function (response) {
            //console.log(response);
            page_acs_token=response.data[0].access_token;

            FB.api(
                    "/1558622937701203/feed",
                    "POST",
                    {
                        "message": fbPost,
                        "access_token": page_acs_token,
                        "link": "http://www.google.com"
                    },
                    function (response) {
                      if (response && !response.error) {
                        // handle the result 
                        //qwe=response;
                        var d = new Date();
                        var t= d.getTime();
                        console.log("timstamp : "+t);
                      }
                      else{
                        //errqwe=response.error;
                      }
                    }
                );

        } );

    /*FB.api('/me/permissions', function (response) {
        console.log(response);
    } );*/

    return false;

  }

});