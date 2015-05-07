TwitterFollowersIDsCollecions = new Mongo.Collection("twitterFollowersIDs");
TwitterFollowersDetailsCollecions = new Mongo.Collection("twitterFollowersDetails");

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

      //console.log("contactsDrawerPaperTabs event : event.originalEvent.detail.item.getAttrr...label");
    }
  });

  Template.twitterContacts.onCreated(function () {
    this.counter = new ReactiveVar(2);
  });

  Template.twitterContacts.helpers({
    twitterContactsHelper: function () {
      curntCounter=0;
      return TwitterFollowersDetailsCollecions.find();
    },

    contactsColumnHelperIsOdd: function(){
        curntCounter=curntCounter+1;
        var twitterContactsRowVar=curntCounter%2;
        console.log(curntCounter+":"+twitterContactsRowVar);
        Template.instance().counter.set(curntCounter+1);
        if(twitterContactsRowVar%2!="0"){
          return true;
        }
        else{
          return false;
        }
    }

  });

    Accounts.ui.config({
    requestPermissions: {
      twitter: ['email', 'public_profile', 'user_friends','read_stream','user_likes'],
    }

  });