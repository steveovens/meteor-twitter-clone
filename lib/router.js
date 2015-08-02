Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

// Router.map is deprecated - rewriting to use Router.route(...)
//Router.map(function() {
//  this.route('tweetStream', {path: '/'});
//  this.route('notifications', {path: '/notifications'});
//  this.route('profile', {path: '/profile'});
//});

Router.route('/', function() {
  this.render('tweetStream');
}, {
  name: 'tweets', // example custom route name - use pathFor 'tweets' in HTML to get the link
  waitOn: function() {
    return [
      Meteor.subscribe('tweets') // Matches Meteor.publish('tweets')
    ];
  }
}
);
Router.route('/notifications'); // notifications template is implied
Router.route('/u/:username', function() {
  this.render('profile');
},{
  name: 'profile',
  waitOn: function() {
    return Meteor.subscribe('profile', this.params.username);
  },
  // data sets the 'data context' for the template rendering
  // Not a common approach - more typical to use template helpers for this
  data: function() {
    return {
      user: Users.findOne({username: this.params.username})
    };
  }
});