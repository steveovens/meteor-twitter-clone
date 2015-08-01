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
  name: 'tweets' // example custom route name - use pathFor 'tweets' in HTML to get the link
}
);
Router.route('/notifications'); // notifications template is implied
Router.route('/profile'); // profile template is implied
