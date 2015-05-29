  Template.drawerPanel.helpers({
    whichHeaderPanel: function () {

      return Session.get("whichHeaderPanel");
    }
  });

  Template.drawerPanel.events({
    'core-select .sideMainMenu': function (event, detail) {
      e = event;

      //console.log("event : "+event.originalEvent.detail.item.id);

      Session.set("whichHeaderPanel", event.originalEvent.detail.item.id);

    }
  });

  Template.socialContacts.events({
    'core-select .contactsDrawerPaperTabs': function (event) {

      var tabs = document.querySelector('paper-tabs');
      var pages = document.querySelector('core-pages');

      //console.log("tabs: "+tabs+" pages : "+pages);

      pages.selected = tabs.selected;


      if(event.originalEvent.detail.item.getAttribute('label')==='fbLabel'){
      //console.log("contactsDrawerPaperTabs event : "+event.originalEvent.detail.item.getAttribute('label'));
      console.log("RAY IS SUCCESS");

               FB.getLoginStatus(function(response) {
       if (response.status === 'connected') {
         // the user is logged in and has authenticated your
         // app, and response.authResponse supplies
         // the user's ID, a valid access token, a signed
         // request, and the time the access token 
         // and signed request each expire
         var uid = response.authResponse.userID;
         var accessToken = response.authResponse.accessToken;
         console.log(uid);

                FB.api(
             "/1558622937701203/insights/page_fans_city",
             function (response) {
               
               console.log("ray debug");

               if (response && !response.error) {

                varResp = response;

                 //fbFeedsWholeJSON = FB.JSON.stringify(response);
                 fbFeeds = response.data;

                 console.log(response);
                 
                 /*for(var i in fbFeeds)
                 {

                     FbFeedsCollecions.insert({
                       fromName: fbFeeds[i].from.name,
                       message: fbFeeds[i].message,
                       created_Time: fbFeeds[i].created_Time,
                       story: fbFeeds[i].story
                     });
                 }*/
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
    }
  });

    Template.socialFeed.events({
    'core-select .socialFeedDrawerPaperTabs': function (event) {

      var tabs = document.querySelector('paper-tabs');
      var pages = document.querySelector('core-pages');

      //console.log("tabs: "+tabs+" pages : "+pages);

      pages.selected = tabs.selected;

      //console.log("contactsDrawerPaperTabs event : event.originalEvent.detail.item.getAttrr...label");
    }
  });




