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
  this.render('tweetStream'); }
);
Router.route('/notifications'); // notifications -> notifications is implied
Router.route('/profile'); // profile-> profile is implied
