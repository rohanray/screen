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

    Template.socialFeed.events({
    'core-select .socialFeedDrawerPaperTabs': function (event) {

      var tabs = document.querySelector('paper-tabs');
      var pages = document.querySelector('core-pages');

      //console.log("tabs: "+tabs+" pages : "+pages);

      pages.selected = tabs.selected;

      //console.log("contactsDrawerPaperTabs event : event.originalEvent.detail.item.getAttrr...label");
    }
  });




