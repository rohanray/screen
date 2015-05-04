TwitterFollowersIDsCollecions = new Mongo.Collection("twitterFollowersIDs");

  Template.drawerPanel.helpers({
    whichHeaderPanel: function () {

      return Session.get("whichHeaderPanel");
    }
  });

  Template.drawerPanel.events({
    'core-select .sideMainMenu': function (event, detail) {
      e = event;

      console.log("event : "+event.originalEvent.detail.item.id);

      Session.set("whichHeaderPanel", event.originalEvent.detail.item.id);

    }
  });

  Template.socialContacts.events({
    'core-select .contactsDrawerPaperTabs': function (event) {

      var tabs = document.querySelector('paper-tabs');
      var pages = document.querySelector('core-pages');

      console.log("tabs: "+tabs+" pages : "+pages);

      pages.selected = tabs.selected;

      //start of twitter

      Meteor.call('getTwitterFollowersIDsCollectionsClient', function (error, result) {
        console.log("client side functions : "+result);
      });

      console.log("contactsDrawerPaperTabs event : event.originalEvent.detail.item.getAttrr...label");
    }
  });

    Accounts.ui.config({
    requestPermissions: {
      twitter: ['email', 'public_profile', 'user_friends','read_stream','user_likes'],
    }

  });