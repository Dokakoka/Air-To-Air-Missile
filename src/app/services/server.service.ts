import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class ServerService {

    constructor(private _AngularFirestore: AngularFirestore) {
        // this.collectionRef = db.collection("/missile")
    }

    update(data:(number | boolean)[]) {
      return this._AngularFirestore.collection("/missile").doc('missile').update({
          burner: data[0],
          armed: data[1],
          ammo: data[2],
          ammoAvailable: data[3],
          proximity: data[4],
          x: data[5],
          y: data[6],
          warhead: data[7]
        })
    }

    updatePlane(data:(number | boolean)[]) {
      return this._AngularFirestore.collection("/missile").doc('target').update({
        x:data[0],
        y: data[1],
        })
    }

    getAll() {
      return this._AngularFirestore.collection("/missile");
    }


}
