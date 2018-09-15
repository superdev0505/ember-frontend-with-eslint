import { Factory, hasMany, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name() {
    return `${faker.company.companyName()}  Hospital`;
  },

  longitude() {
    return faker.address.longitude();
  },

  latitude() {
    return faker.address.latitude();
  },

  userLocations: hasMany('user-location'),
  users: hasMany('user')
});
