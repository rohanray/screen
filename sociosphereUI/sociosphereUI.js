if (Meteor.isClient) {

  document.addEventListener('polymer-ready', function () {
    var bodyObj = document.getElementsByTagName('body');
    //alert(bodyObj);
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}