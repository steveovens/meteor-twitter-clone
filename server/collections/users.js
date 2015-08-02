Users.after.update(function(userId, doc, fields, modifier) {
    if ( modifier && modifier.$push && !! modifier.$push["profile.followingIds"]) {
        // We are following the user identified by modifier.$push["profile.followingIds"])...
        // need to update THEIR followerCount
        Users.update(modifier.$push["profile.followingIds"], {$inc: {followerCount: 1} });
    } else if ( modifier && modifier.$pull && !! modifier.$pull["profile.followingIds"]) {
        // We are no longer following the user identified by modifier.$pull["profile.followingIds"]...
        // need to update THEIR followerCount
        Users.update(modifier.$pull["profile.followingIds"], {$inc: {followerCount: -1} });
    }
});

Users.before.insert(function(userId, doc) {
    doc.followersCount = 0;
    doc.tweetCount = 0;
});
