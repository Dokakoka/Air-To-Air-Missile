export class proximityDriver {

  private proximity:boolean = false;

  getProximity() {
    return this.proximity;
  }

  activateProximityTrigger() {
    this.proximity = true;
  }
}
