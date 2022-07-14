export class cameraDriver {

  private targetCoordinates:number[] = [];

  calculateTargetAngles(el: HTMLElement) {
    var rect = el.getBoundingClientRect();
    this.targetCoordinates[0] = rect.left;
    this.targetCoordinates[1] = rect.top;
    return this.targetCoordinates;
  }

  getTargetCoordinates() {
    return this.targetCoordinates
  }

  setTargetCoordinates(targetCoordinates: number[]) {
    this.targetCoordinates = targetCoordinates
  }

}
