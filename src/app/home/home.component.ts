import { Component, OnInit } from '@angular/core';
import { Missile } from '../models/Missile';
import { Aircraft } from '../models/Aircraft';
import { cameraDriver } from '../models/cameraDriver';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  aircraft = Aircraft.getInstance();
  mis = new Missile();

  camera = new cameraDriver();

  settingsButton: boolean;

  constructor(private serverService: ServerService) {
    setInterval(()=>{
        if (this.settingsButton == true) {
          this.serverService.update(this.aircraft.element).then( ()=>{
            this.settingsButton = false;
          });
        }

        if(this.aircraft.buttonPressed == true) {
            this.serverService.update(this.aircraft.element).then( ()=>{

              console.log(this.aircraft.element)
            });

            if(this.aircraft.element[4] == true ) {
              this.serverService.update(this.aircraft.element).then( ()=>{
              });

              this.aircraft.buttonPressed = false;
            }

            this.serverService.updatePlane(this.aircraft.targetCoordinates).then( ()=>{
              // console.log(this.aircraft.targetCoordinates)
            });

        }
    },500)
  }

  ngOnInit(): void {
  }
  title = 'Air To Air Missile';

  x=0;
  y=0;

  boostTargetPlane(el: HTMLElement) {
    for(var i=0; i<600; i+=10) {
      el.style.transition = "all 10s"
      el.style.transform = `translate(${i}px,${this.y}px)`
    }
  }

  setValues(values: any, firstPlane: HTMLElement, secondPlane: HTMLElement) {
    this.settingsButton = true;
    firstPlane.style.marginLeft = values.firstX+ "px"

    firstPlane.style.marginTop = values.firstY+ "px"
    secondPlane.style.marginLeft = values.secondX+ "px"
    secondPlane.style.marginTop = values.secondY+ "px"

    this.aircraft.setAmmo(values.ammo);
    this.aircraft.element[3] = this.aircraft.checkAmmo();
    this.aircraft.element[2] = this.aircraft.getAmmo();

  }


}
