import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    save(availability) {
      let newUpdate = availability;
      newUpdate.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            newUpdate.save()
              .then(()=>{
                this.set('showSaved',  true);
                this.transitionToRoute('app.availabilities.show', availability.id);
              })
              .catch((error) => {
                this.set('errorMessage', error);
              });
          }
        });
    }
  }
});
