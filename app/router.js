import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', function() {
    this.route('login');
    this.route('register');
    this.route('forgot-password');
  });

  this.route('app', function() {
    // Core routes
    this.route('home', function() {
      this.route('teach');
      this.route('learn');
      this.route('resources');
    });
    this.route('search', function() {
      this.route('people');
      this.route('resources');
    });
    this.route('add');
    this.route('alerts', function() {
      this.route('activity');
      this.route('messages');
    });
    this.route('myoslr');

    // Managing teaching sessions
    this.route('availabilities', function() {
      this.route('new');
      this.route('show', { path: '/availabilities/:availability_id' });
      this.route('edit', { path: '/availabilities/:availability_id/edit' });
    });

    // Managing teaching requests
    this.route('requests', function() {
      this.route('new');
      this.route('show', { path: '/requests/:request_id' });
      this.route('edit', { path: '/requests/:request_id/edit' });
    });

    // User account management
    this.route('users', function() {
      this.route('show', { path: '/:user_id' });
    });

    this.route('newmessage');
    this.route('settings');
    this.route('editprofile');
    this.route('editpassword');
    this.route('notificationsettings');
  });
  this.route('noaccess', function() {
    this.route('unconfirmed');
  });
});

export default Router;
