import {HttpClient, json} from 'aurelia-fetch-client';
import {ApiPath} from './apiPath';

export class UserService {
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
  getUsers(fromCache) {
    if (!fromCache) {
      this.users = null;
    }
    let promise = new Promise((resolve, reject) => {
      if (!this.users) {
        this.http.fetch(this.apiPath.user)
          .then(response => {
            this.users = response.json();
            resolve(this.users);
          });
      } else {
        resolve(this.users);
      }
    });
    return promise;
  }

  createUser(user) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.user, {
        method: 'POST',
        body: json(user)
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

  updateUser(user) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.user + '/' + user.id, {
        method: 'PUT',
        body: json(user)
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

  deleteUser(user) {
    let promise = new Promise((resolve, reject) => {
      this.http.fetch(this.apiPath.user + '/' + user.id, {
        method: 'DELETE',
        body: json(user)
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
