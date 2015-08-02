Migrations = new Meteor.Collection('migrations');

Meteor.startup(function() {
    if (!Migrations.findOne({name: 'ensureTweetsHaveTimestamp'})) {
        console.log("//----------------------------------------------------------------------//");
        console.log("//--------//    Starting ensureTweetsHaveTimestamp Migration    //------//");
        console.log("//----------------------------------------------------------------------//");

        Tweets.find({tweetedAt: {$exists : false}}).forEach(function (tweet) {
            Tweets.update(tweet._id, {$set: {tweetedAt: new Date()}});

            // START CONSOLE LOGS
            console.log("---------------------")
            console.log("Tweet: "+tweet.text);
            console.log("Updating tweetedAt time to now");
            // END CONSOLE LOGS
        });
        Migrations.insert({name: 'ensureTweetsHaveTimestamp'});
        console.log("//----------------------------------------------------------------------//")
        console.log("//---------//    Ending ensureTweetsHaveTimestamp Migration    //-------//");
        console.log("//----------------------------------------------------------------------//")
    }

    if (!Migrations.findOne({name: 'ensureUsersCanFollow'})) {
        console.log("//----------------------------------------------------------------------//");
        console.log("//-------//    Starting ensureUsersCanFollow Migration    //-----//");
        console.log("//----------------------------------------------------------------------//");

        Users.find({"profile.followingIds": {$exists : false}}).forEach(function (user) {
            Users.update(user._id, {$set: {"profile.followingIds": []}});

            // START CONSOLE LOGS
            console.log("---------------------");
            console.log("User: "+user.username);
            console.log("Setting user following array to []");
            // END CONSOLE LOGS
        });
        Migrations.insert({name: 'ensureUsersCanFollow'});
        console.log("//----------------------------------------------------------------------//")
        console.log("//--------//    Ending ensureUsersCanFollow Migration    //------//");
        console.log("//----------------------------------------------------------------------//")
    }


    if (!Migrations.findOne({name: 'ensureUsersHaveFollowerCounts'})) {
        console.log("//----------------------------------------------------------------------//");
        console.log("//------//    Starting ensureUsersHaveFollowerCounts Migration    //----//");
        console.log("//----------------------------------------------------------------------//");

        Users.find({followerCount: {$exists : false}}).forEach(function (user) {
            Users.update(user._id, {$set: {followerCount: 0}});

            // START CONSOLE LOGS
            console.log("---------------------");
            console.log("User: "+user.username);
            console.log("Initialising FollowerCount to 0");
            // END CONSOLE LOGS
        });
        Migrations.insert({name: 'ensureUsersHaveFollowerCounts'});
        console.log("//----------------------------------------------------------------------//")
        console.log("//-------//    Ending ensureUsersHaveFollowerCounts Migration    //-----//");
        console.log("//----------------------------------------------------------------------//")
    }

    if (!Migrations.findOne({name: 'removeDeprecatedFollowingCount'})) {
        console.log("//----------------------------------------------------------------------//");
        console.log("//-----//    Starting removeDeprecatedFollowingCount Migration    //----//");
        console.log("//----------------------------------------------------------------------//");

        Users.find({followingCount: {$exists : true}}).forEach(function (user) {
            Users.update(user._id, {$unset: {followingCount: ""}});

            // START CONSOLE LOGS
            console.log("---------------------");
            console.log("User: "+user.username);
            console.log("Removing (deprecated) FollowingCount");
            // END CONSOLE LOGS
        });
        Migrations.insert({name: 'removeDeprecatedFollowingCount'});
        console.log("//----------------------------------------------------------------------//")
        console.log("//------//    Ending removeDeprecatedFollowingCount Migration    //-----//");
        console.log("//----------------------------------------------------------------------//")
    }

    if (!Migrations.findOne({name: 'ensureUsersHaveTweetCounts'})) {
        console.log("//----------------------------------------------------------------------//");
        console.log("//-------//    Starting ensureUsersHaveTweetCounts Migration    //------//");
        console.log("//----------------------------------------------------------------------//");

        Users.find({tweetCount: {$exists : false}}).forEach(function (user) {
            var tweets = Tweets.find({userId: user._id}).count();
            Users.update(user._id, {$set: {tweetCount: tweets}});

            // START CONSOLE LOGS
            console.log("---------------------");
            console.log("User: "+user.username);
            console.log("Updating User TweetCount to " + tweets);
            // END CONSOLE LOGS
        });
        Migrations.insert({name: 'ensureUsersHaveTweetCounts'});
        console.log("//----------------------------------------------------------------------//")
        console.log("//--------//    Ending ensureUsersHaveTweetCounts Migration    //-------//");
        console.log("//----------------------------------------------------------------------//")
    }

});

