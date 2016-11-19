export class App {
  configureRouter(config, router) {
    config.title = 'Jobs Task';
    config.map([
      { route: ['', 'Home'], name: 'home', moduleId: 'components/home', nav: true, title: 'Home' },
      { route: 'task1', name: 'task1', moduleId: 'components/task1', nav: true, title: 'Task 1' },
      { route: 'task2', name: 'task2', moduleId: 'components/task2', nav: true, title: 'Task 2' },
      { route: 'task3', name: 'task3', moduleId: 'components/task3', nav: true, title: 'Task 3' },
      { route: 'task4', name: 'task4', moduleId: 'components/task4', nav: true, title: 'Task 4' },
      { route: 'task5', name: 'task5', moduleId: 'components/task5', nav: true, title: 'Task 5' }
    ]);

    this.router = router;
  }
}
