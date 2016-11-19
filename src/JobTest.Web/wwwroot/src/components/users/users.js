import {UserService} from 'data/userService';
import {DialogService} from 'aurelia-dialog';
import {UserForm} from 'components/users/user-form';

export class Users {
  static inject = [UserService, DialogService];

  constructor(userService, dialogService) {
    this.userService = userService;
    this.dialogService = dialogService;
    this.user = { loginName: '', firstName: '', lastName: ''};
    this.users = [];
  }

  activate() {
    return this.getUsers();
  }

  getUsers() {
    return this.userService.getUsers().then(response => {
      this.users = response;
    });
  }
  openForm(user) {
    this.dialogService.open({ viewModel: UserForm, model: user}).then(response => {
      if (!response.wasCancelled) {
        if (user.id > 0) {
          this.userService.updateUser(user).then(updateResponse => {
            console.log('updateResponse: ' + updateResponse);
          });
        } else {
          this.userService.createUser(user).then(createResponse => {
            console.log('createResponse: ' + createResponse);
            return this.getUsers(false);
          });
        }
      } else {
        console.log('bad');
      }
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user).then(deleteResponse => {
      console.log('deleteResponse: ' + deleteResponse);
      return this.getUsers(false);
    });
  }
}

