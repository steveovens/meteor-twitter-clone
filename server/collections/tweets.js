// Server-side collection helpers
// These are updates where we are more concerned about security than latency compensation
Tweets.before.insert(function(userId, doc) {
    Users.update(Meteor.userId(), {$inc: {tweetCount: 1} });
});
