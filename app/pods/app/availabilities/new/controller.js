import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    save(availability) {
      let newAvailability = availability;
      newAvailability.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            newAvailability.save()

              .then(()=>{
                this.set('showSaved',  true);
                this.transitionToRoute('app.availabilities.show', availability.id);
              });
          }
        });
    }
  }

});
