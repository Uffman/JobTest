export class Task3 {
  heading = 'Task3';
  constructor() {
    this.leapYearValue = null;
    this.isLeapYear = false;
  }

  checkIfLeapYear() {
    let year = parseInt(this.leapYearValue);
    this.isLeapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);    
    return this.isLeapYear;
  }

  showAlert() {
    alert('Prestopno leto: ' + this.isLeapYear);
  }

  get leapYearConfirmation() {
    return this.checkIfLeapYear();
  }
}
