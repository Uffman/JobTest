import {CompanyService} from 'data/companyService';
import {DialogService} from 'aurelia-dialog';
import {CompanyForm} from 'components/companies/company-form';

export class Companies {
  static inject = [CompanyService, DialogService];
  constructor(companyService, dialogService) {  
    this.companyService = companyService;
    this.dialogService = dialogService;
    this.company = { address: '', name: ''};
    this.companies = [];
  }

  activate() {
    return this.getCompanies();
  }

  getCompanies() {
    return this.companyService.getCompanies().then(response => {
      this.companies = response;
    });
  }

  openForm(company) {
    this.dialogService.open({ viewModel: CompanyForm, model: company}).then(response => {
      if (!response.wasCancelled) {
        if (company.id > 0) {
          this.companyService.updateCompany(company).then(updateResponse => {
            console.log('updateResponse: ' + updateResponse);            
          });
        } else {
          this.companyService.creatCompany(company).then(createResponse => {
            console.log('createResponse: ' + createResponse);
            this.getCompanies(false);
          });
        }
      } else {
        console.log('bad');
      }
      //console.log(response.output);
    });
  }

  deleteCompany(company) {
    return this.companyService.deleteCompany(company).then(deleteResponse => {
      debugger;
      console.log('deleteResponse: ' + deleteResponse);
      this.getCompanies(false);
    });
  }
}
