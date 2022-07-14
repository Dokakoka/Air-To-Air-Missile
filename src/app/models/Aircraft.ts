import { Missile } from "./Missile";
import { cameraDriver } from "./cameraDriver";
import { proximityDriver } from "./proximityDriver";
import { Warhead } from "./Warhead";

export class Aircraft {

  static instance: Aircraft;

  proximity = new proximityDriver();

  missile = new Missile();

  camera = new cameraDriver();

  warhead = new Warhead();

  private ammo:number = 8;

  public buttonPressed:boolean = false;

  private ammoAvailable: boolean = true;

  public targetCoordinates:number[] = [0, 0];

  element =[this.missile.getBurner(), this.missile.getArmed(), this.ammo, this.ammoAvailable, this.proximity.getProximity(), this.missile.getMissileCoordinates()[0], this.missile.getMissileCoordinates()[1], this.warhead.getWarhead()];

  static getInstance() {
    if(!Aircraft.instance) {
      Aircraft.instance = new Aircraft();
    }
    return Aircraft.instance;
  }

  getAmmo() {
    return this.ammo;
  }

  setAmmo(ammoNumber: number) {
    this.ammo = ammoNumber
  }

  checkAmmo() {
    if(this.ammo<1) {
      return false;
    } else {
      return true;
    }
  }

  fire(plane: HTMLElement, missi: HTMLElement) {
    let missile = new Missile();

    if (this.checkAmmo()) {
      let ammo = this.getAmmo();
      this.setAmmo(ammo-1);
      this.buttonPressed = true;
      this.ammoAvailable = this.checkAmmo();
      this.element [0]  = missile.getBurner()
      this.element [1]  = missile.getArmed()
      this.element[4]  = this.proximity.getProximity();
      this.element[7]  = this.warhead.getWarhead();
      missi.style.opacity = "1"
      missi.style.transition = "all 0.5s"

      setTimeout(()=>{
        missile.activateBurner()
        this.element [0]  = missile.getBurner()
      }, 500)

      setTimeout(()=>{
        missile.armingMissile();
        this.element[1]  = missile.getArmed()
      }, 3500)

      let z = true
      setInterval(()=>{

      if(missile.getBurner() && missile.getArmed() ) {
          this.targetCoordinates = this.camera.calculateTargetAngles(plane);
          let missileAngles = this.getAngles(missi, missile);

          missile.setMissileXY(missileAngles);

          if(this.camera.getTargetCoordinates()[0] <= missile.getMissileXY()[0]+44) {
              z= false
              missi.style.transition = "all 0s"
              missi.style.opacity = "0"
              missile.directMissile(missi, 235, 240)

              let proximity = new proximityDriver();
              let warhead = new Warhead();
              proximity.activateProximityTrigger();
              warhead.explode();
              this.element[0]  = missile.getBurner();
              this.element[1]  = missile.getArmed();
              this.element[4]  = proximity.getProximity();
              this.element[7]  = warhead.getWarhead();
          } else if(z) {
            missile.directMissile(missi, this.camera.getTargetCoordinates()[0], this.camera.getTargetCoordinates()[1])
          }
        }
      })

      this.element[2]  = this.ammo
      this.element[3]  = this.ammoAvailable


    } else {
      missi.style.opacity = "0"
    }

    }

    getAngles(missi:HTMLElement, missile:Missile) {
      var rect = missi.getBoundingClientRect();
      missile.setMissileCoordinates(rect.left, rect.top);
      this.element[5] = rect.left+44;
      this.element[6] = rect.top;
      return missile.getMissileCoordinates();
    }

}
