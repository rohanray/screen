if (Meteor.isClient) {

  Template.headerLayoutWIP.helpers({
    whichHeaderPanel: function () {

      return Session.get("whichHeaderPanel");
    }
  });

  Template.headerLayoutWIP.events({
    'core-select .sideMainMenu': function (event, detail) {
      e = event;

      console.log("event : "+event.originalEvent.detail.item.label);

      Session.set("whichHeaderPanel", event.originalEvent.detail.item.label);

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}