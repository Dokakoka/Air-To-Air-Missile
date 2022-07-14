import { Component} from '@angular/core';
import { ServerService } from '../services/server.service';
import {map} from 'rxjs/operators'
import { Missile } from '../models/Missile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  missile = new Missile();
  xAxis: object
  yAxis: object
  chartTitle: String
  legend: object
  markerSettings: object
  chartDisplay: boolean
  tooltipSettings: object

  constructor(private serverService:ServerService) {
    this.chartTitle = "Air To Air Missile"
    this.xAxis = {
      title: "X"
    };

    this.tooltipSettings = {
      enable: true
    }

    this.markerSettings = {
      visible: true,

      dataLabel: {
        visible: true
      }
    };

    this.legend = {
      visible: true
    }

    this.yAxis = {
      title: "Y"
    };
  }

  data: any
  chart:any = []
  planeLine: any = []

  ngOnInit() {
    this.serverService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
          changes.map(c =>
              ({id: c.payload.doc.id, ...c.payload.doc.data()})
            )
        )
      ).subscribe(data => {
        this.data = data;
        this.chart.push({"x": this.data[0].x, "y": this.data[0].y})
        this.planeLine.push({"x": this.data[1].x, "y": this.data[1].y})
      })
  }

}
