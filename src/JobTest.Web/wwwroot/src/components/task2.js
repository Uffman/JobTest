export class Task2 {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'companies'], name: 'companies', moduleId: 'components/companies/companies', nav: true, title: 'Companies' },
      { route: 'users', name: 'users', moduleId: 'components/users/users', nav: true, title: 'User' }
    ]);

    this.router = router;
  }
}
