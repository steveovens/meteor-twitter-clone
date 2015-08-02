/**
 * Created by steveovens on 1/08/2015.
 */
Users = Meteor.users;

Users.helpers({
    followingCount: function() {
        return this.profile.followingIds.length;
    }
});



Meteor.methods({
    follow: function (followId) {
        Users.update(this.userId, {$push: {"profile.followingIds": followId}})
    }
    ,
    unfollow: function (unfollowId) {
        Users.update(this.userId, {$pull: {"profile.followingIds": unfollowId}})
    }

});
