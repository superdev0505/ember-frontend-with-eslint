export default function(server) {
  server.loadFixtures('users');
  server.loadFixtures('locations');
  server.loadFixtures('job-titles');
  server.loadFixtures('user-locations');
  server.loadFixtures('availabilities');
  // Create extra availabilities to allow testing of scrolling
  server.createList('availability', 25);
}
