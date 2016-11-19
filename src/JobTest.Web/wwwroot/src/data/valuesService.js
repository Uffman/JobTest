import {HttpClient} from 'aurelia-fetch-client';
import {ApiPath} from './apiPath';

export class ValuesService {
  static inject() {
    return [HttpClient, ApiPath];
  }

  constructor(httpClient, apiPath) {
    this.http = httpClient;
    this.apiPath = apiPath;

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.apiPath.baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        });
    });
  }
  getVersion() {
    let promise = new Promise((resolve, reject) => {   
      this.http.fetch(this.apiPath.value + '/getVersion')
        .then(response => {
          this.version = response.json();
          resolve(this.version);
        });
    });
    return promise;
  }
  getImage(filePath) {
    if (!filePath) {
      filePath = '';
    }
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.value + '/Download/' + filePath)
        .then(response => {
          this.image = response.json();
          resolve(this.image);
        });
    });
    return promise;
  }
}
