import {ValuesService} from 'data/valuesService';

export class Task4 {
  static inject = [ValuesService];
  message = 'Task4';

  constructor(valuesService) {
    this.valuesService = valuesService;
  }

  activate() {
    let p1 = this.valuesService.getVersion()
        .then(response  => {
          this.version = response;
        });
    let p2 = this.valuesService.getImage()
        .then(response  => {
          this.image = response;
        });
    return Promise.all([p1, p2]);
  }
}

