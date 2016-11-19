import {DialogController} from 'aurelia-dialog';

export class CompanyForm {
  static inject = [DialogController];

  constructor(controller) {
    this.controller = controller;
    this.company = {};
  }

  activate(company) {
    this.company = company;
  }
}
