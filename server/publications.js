Meteor.publish('tweets', function() {
    if (this.userId) {
        var userCursor = Users.find({_id: this.userId}); // get a handle to the results
        var user = userCursor.fetch()[0]; // Returns the current user record as an object
        var cursors = []; // initialise the result

        // Now we need to work out the user ids to find matching tweets
        // This is a combination of our own user Id plus the id of anyone we are following
        var ids = [];
        var self = this;
        ids.push(user.profile.followingIds); // Add all the followingIds into the array
        ids.push(self.userId); // Add our userId to the list
        var followingIds = _.flatten(ids); // Turn it into a flat array

        // We need to publish both Tweets and Users so we can render usernames etc. on the client
        cursors.push(Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}}));
        cursors.push(Users.find({
            _id: {$in: followingIds}
        }));

        return cursors;
    } else {
        return [];
    }
});

Meteor.publish('profile', function(username) {
   return Users.find({username: username}, {fields: {username: 1, profile: 1, followerCount: 1, tweetCount: 1}});
});