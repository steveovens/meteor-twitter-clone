Template.tweetStream.helpers({
    //add you helpers here
    tweets: function() {
        return Tweets.find({},{sort: {tweetedAt: -1}});
    }
});

Template.tweetStream.events({
    "submit #tweetForm": function(event, template) {
        event.preventDefault(); // prevent post action (page refresh)
        var text = template.$('.tweet-text').val();
        if ( !! text) {
            Tweets.insert({text:text}, function(error, result) {
                if (result) {
                    CoffeeAlerts.success('Your tweet has been added.');
                    template.$('.tweet-text').val(null);
                } else {
                    CoffeeAlerts.warning('There was a problem adding your tweet. Try again later.');
                    console.log(error);
                }
            });

        }
    }
    //add your events here
});

Template.tweetStream.onCreated(function () {
    //add your statement here
});

Template.tweetStream.onRendered(function () {
    //add your statement here
});

Template.tweetStream.onDestroyed(function () {
    //add your statement here
});

