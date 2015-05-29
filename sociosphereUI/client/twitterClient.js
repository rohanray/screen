Accounts.ui.config({
  requestPermissions: {
    twitter: ['email', 'public_profile', 'user_friends','read_stream','user_likes']
    
  }

});

Template.twitterContacts.onCreated(function () {
  this.counter = new ReactiveVar(0);
});

Template.twitterContacts.helpers({
  twitterContactsHelper: function () {
    curntCounter=0;
    return TwitterFollowersDetailsCollecions.find();
  },

  contactsColumnHelperIsOdd: function(){
      curntCounter=curntCounter+1;
      var twitterContactsRowVar=curntCounter%2;
      //console.log(curntCounter+":"+twitterContactsRowVar);
      Template.instance().counter.set(curntCounter+1);
      if(twitterContactsRowVar%2!="0"){
        return true;
      }
      else{
        return false;
      }
  }

});

Template.twitterFeedContent.helpers({
  twitterAllMyTweetsHelper: function () {
    return TwitterAllMyTweetsCollections.find();
  }
});