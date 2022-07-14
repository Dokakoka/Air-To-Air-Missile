export class Warhead {

  private warhead:boolean = false;

  explode() {
    this.warhead = true;
  }

  getWarhead() {
    return this.warhead;
  }
}
