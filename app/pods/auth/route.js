import Route from '@ember/routing/route';

export default Route.extend({
  // If already authenticated, redirect
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.replaceWith('app.home.teach');
    }
  }
});
