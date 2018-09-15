import Component from '@ember/component';
import { observer } from '@ember/object';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  chosenFile: null,
  url: '/users/upload_avatar',
  classNames: ['picture-upload'],

  uploadFile: observer('chosenFile', function() {
    let _this = this;
    $('.loadingSpinner').removeClass('hidden');

    let form = new FormData();
    let [control] = $(`#${this.elementId} .file-upload-field`);
    form.append('file', control.files[0]);

    $.ajax({
      url: _this.get('apiUrl') + _this.get('url'),
      type: 'POST',
      contentType: false,
      processData: false,
      cache: false,

      data: form,

      beforeSend(xhr) {
        _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });

      },

      success() {
        // Refresh the image
        _this.get('user').reload();
        $('.loadingSpinner').addClass('hidden');
      },
      error(e) {
        alert(`Your picture could not be uploaded. Please try again. Error: ${e.statusText}`);
        $('.loadingSpinner').addClass('hidden');
      }
    });

  }),

  actions: {

    // Simply click the hidden file input field
    // jQuery approach doesn't work properly -> use raw JS
    choosePhoto() {
      let [elem] = $(`#${this.elementId} .file-upload-field`);
      if (elem && document.createEvent) {
        let evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        elem.dispatchEvent(evt);
      }
    },

    deleteAvatar() {
      let _this = this;
      if (confirm('Remove your profile picture?')) {
        $.ajax({
          url: `${_this.get('apiUrl')}/users/delete_avatar`,
          type: 'post',
          beforeSend(xhr) {
            _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
              xhr.setRequestHeader(headerName, headerValue);
            });
          },
          success() {
            // Can pass function(data) here - not needed.
            _this.get('session').get('currentUser').reload();
          }
        });
      }
      return false;
    }

  }
});
