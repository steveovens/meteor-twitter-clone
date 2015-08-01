Meteor.publish('tweets', function() {
    return Tweets.find({}, {sort: {tweetedAt: -1}});
});
