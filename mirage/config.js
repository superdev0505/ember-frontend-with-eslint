import Mirage from 'ember-cli-mirage';
import Response from 'ember-cli-mirage/response';

export default function() {

  // Needed for ember-cli-code-coverage
  this.passthrough('/write-coverage');

  this.urlPrefix = 'http://localhost:4200';
  // this.namespace = '/api';
  this.namespace = '';
  this.get('users');
  this.get('/users/:id');
  this.get('locations');
  this.get('availabilities');
  this.get('locations/:id');
  this.get('availabilities/:id');
  this.get('specialties');
  // this.put('api/availabilities/edit/:id');
  this.get('availabilities/show/:id');

  this.patch('/availabilities/:id', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();
    let { id } = request.params;
    if (!attrs.startTime || !attrs.endTime)  {
      return new Response(422, { some: 'header', 'Content-Type': 'application/json' }, {
        'errors': [
          {
            startTime: 'Your info cant be empty',
            endTime: 'Info cant be blank',
            description: 'Please enter info cant be blank'
          }
        ] }
      );
    } else {
      return schema.availabilities.find(id);
    }
  });

  // this.put('availabilities/edit/:id');
  this.del('/availabilities/:id');
  this.get('job-titles');
  this.get('/availability-invites');

  this.get('/api/users', function(db, request) {
    if (request.requestHeaders.Authorization === 'Bearer PA$$WORD') {
      return { user: { id: 1, firstName: 'Chase' } };
    } else {
      return new Mirage.Response(401, {}, {});
    }

  });

  this.post('/users/sign_in', function(schema, request) {
    let params = JSON.parse(request.requestBody);
    let user_id = 1;

    let emailAddressRegEx = /test[0-9]+@oslr.co.uk/;
    let userEmailParams = params['user']['user_email'];
    let userEmail = userEmailParams.match(emailAddressRegEx);
    if (userEmail && params['user']['password'] === 'testing123') {

      return {
        'token': params['user']['user_email'] + params['user']['password'],
        'token_type': 'bearer',
        'user_email': params['user']['user_email'],
        user_id
      };

    } else {
      let body = { errors: 'Email or password is invalid' };
      return new Mirage.Response(401, {}, body);
    }

  });

  this.post('/users', function(db, request) {
    let attrs = JSON.parse(request.requestBody).user;
    let user = db.users.create(attrs);
    return user;
  });

  this.patch('/users/:id');

  this.get('/job-titles');

  this.patch('/job-titles/:id');

  this.get('/user-locations');

  this.get('/locations');
  this.patch('/locations/:id');

  this.post('/email-accounts', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let id = attrs.userId;
    let user = schema.users.find(id);
    let newlyAddedEmail = attrs.email;
    // Check if user's email is the same as
    // the user's secondary email being added
    if (newlyAddedEmail === user.email) {
      return new Response(422, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, {
        errors: [{
          status: 422,
          title: 'email is invalid',
          description: `email: ${newlyAddedEmail} is already registered!`
        }]
      });
    } else {
      console.log('Your confirmation code is 1234567'); // eslint-disable-line no-console
      return schema.emailAccounts.create(attrs);
    }
  });

  this.post('/email_accounts/:id/submit_confirmation_code', function(db) {
    let attrs = this.normalizedRequestAttrs();
    let code = '123456';
    let email = db.emailAccounts.where({ confirmed: false });
    if (code === attrs.confirmation_code) {
      email.update({ confirmed: true });
      console.log('Email account updated to confirmed!'); // eslint-disable-line no-console
    } else {
      return new Response(422, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, {
        errors: [{
          status: 422,
          title: 'confirmation code is invalid',
          description: `confirmation code: ${attrs.confirmation_code} is invalid!`
        }]
      });
    }

    return email;
  });

  this.patch('/email-accounts/:id');
  this.get('/email-accounts/:id');
  this.del('/email-accounts/:id');
  this.post('/availabilities', function(db, request) {
    let attrs = JSON.parse(request.requestBody).availability;
    let availability = db.availabilities.create(attrs);
    return availability;
  });
}
