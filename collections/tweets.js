Tweets = new Mongo.Collection('tweets');

// Tweets.helpers uses collection-helpers package to decorate Tweets with extra useful data (user.fullname and username)
Tweets.helpers({
   user: function() {
       return Meteor.users.findOne({_id: this.userId});
   },
   fullName: function() {
       if (this.user() && this.user().profile) {
           return this.user().profile.name;
       }
   },
   userName: function() {
       if (this.user()) {
           return this.user().username;
       }
   },
   tweetTime: function() {
       return moment(this.tweetedAt).fromNow();
   },
   tweetTS: function() {
       var m = moment(this.tweetedAt);
       return m.unix();
   }
});

// Tweets.before.insert uses collection-hooks package to add extra data on server side on insert (tweetedAt timestamp)
Tweets.before.insert(function(userId, doc) {
    doc.userId = userId; // Force userId on tweet to match current logged in user
    doc.tweetedAt = new Date();
});

// See: http://docs.meteor.com/#/full/allow
Tweets.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc, fields, modifier) {
        return false;
    },
    remove: function(userId, doc) {
        return doc.userId === userId;
    }
});