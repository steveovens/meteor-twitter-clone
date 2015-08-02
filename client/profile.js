Template.profile.helpers({
    //add you helpers here
    notMe: function() {
        return this.user && this.user._id != Meteor.userId();
    },
    following: function() {
        return Meteor.user() && _(Meteor.user().profile.followingIds).contains(this.user._id);
    }
});

Template.profile.events({
    //add your events here
    'click [data-action=follow]': function(event, template) {
        Meteor.call('follow', template.data.user._id);
    },
    'click [data-action=unfollow]': function(event, template) {
        Meteor.call('unfollow', template.data.user._id);
    }
});

Template.profile.onCreated(function () {
    //add your statement here
});

Template.profile.onRendered(function () {
    //add your statement here
});

Template.profile.onDestroyed(function () {
    //add your statement here
});

