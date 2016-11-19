import {HttpClient} from 'aurelia-http-client';

export class Task5 {
  static inject = [HttpClient];
  message = 'Task5';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  activate() {
    return this.httpClient.get('http://date.jsontest.com/')
        .then(data  => {
          this.object = data.content;
        });
  }
}

