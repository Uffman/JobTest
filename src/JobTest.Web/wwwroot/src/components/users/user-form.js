import {DialogController} from 'aurelia-dialog';
import {CompanyService} from 'data/companyService';

export class UserForm {
  static inject = [DialogController, CompanyService];

  constructor(controller, companyService) {
    this.user = {};
    this.companies = [];
    this.controller = controller;
    this.companyService = companyService;
  }

  activate(user) {
    this.user = user;
    return this.companyService.getCompanies().then(response => {
      this.companies = response;
    });
  }
}
