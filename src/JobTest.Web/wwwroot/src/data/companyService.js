import {HttpClient, json} from 'aurelia-fetch-client';
import {ApiPath} from './apiPath';

export class CompanyService {
  static inject() { return [HttpClient, ApiPath]; }

  constructor(httpClient, apiPath) {
    this.http = httpClient;
    this.apiPath = apiPath;

    this.http.configure(config => {
      config
          .useStandardConfiguration()
          .withBaseUrl(this.apiPath.baseUrl);
    });
  }
  getCompanies(fromCache) {
    if (!fromCache) {
      this.companies = null;
    }
    let promise = new Promise((resolve, reject) => {
      if (!this.companies) {
        this.http.fetch(this.apiPath.company)
          .then(response => {
            this.companies = response.json();
            resolve(this.companies);
          });
      } else {
        resolve(this.companies);
      }
    });
    return promise;
  }

  creatCompany(company) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.company, {
        method: 'POST',
        body: json(company)
      }).then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
        console.log(err);
      });
    });
    return promise;
  }

  updateCompany(company) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.company + '/' + company.id, {
        method: 'PUT',
        body: json(company)
      }).then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
        console.log(err);
      });
    });
    return promise;
  }

  deleteCompany(company) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.company + '/' + company.id, {
        method: 'DELETE',
        body: json(company)
      }).then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
        console.log(err);
      });
    });
    return promise;
  }
}
