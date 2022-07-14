export class Missile {

  private burner:boolean = false;

  private armed:boolean = false;

  private missileXY:number[] = [];

  private missileCoordinates:number[] = [0,0];

  directMissile(missile:HTMLElement, x:number, y:number) {
    missile.style.transform = `translate(${x-240}px,${y-240}px)`
  }

  getBurner() {
    return this.burner;
  }

  activateBurner() {
    this.burner = true
  }

  getArmed() {
    return this.armed;
  }

  armingMissile() {
    this.armed = true
  }

  getMissileXY() {
    return this.missileXY;
  }

  setMissileXY(coordinates: number[]) {
    this.missileXY = coordinates;
  }

  getMissileCoordinates() {
    return this.missileCoordinates;
  }

  setMissileCoordinates(x: number, y:number) {
    this.missileCoordinates[0] = x;
    this.missileCoordinates[1] = y;
  }

}
