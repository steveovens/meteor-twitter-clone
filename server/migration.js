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

});

