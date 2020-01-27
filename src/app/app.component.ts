import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from 'src/service/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Constants } from './Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppComponent implements OnInit {
  appConst = Constants;

  apiData: any[] = [];
  maxClick: number = 0;
  maxConv: number = 0;
  maxImp: number = 0;
  maxRev: number = 0;
  // title = 'ui';
  expandedElement: any;
  displayedColumns: any[] = ['engagementName', 'segmentName', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataservice.getReportsData().then(res => {
      let tableDataSource = this.dataservice.formatData(res);
      this.apiData = tableDataSource;
      this.setMaxValues();
      console.log(tableDataSource);
      this.dataSource = new MatTableDataSource(tableDataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  setMaxValues() {
    console.log(this.apiData);
    for (let i = 0; i < this.apiData.length; i++) {

      for (let j = 0; j < this.apiData[i].clicks.length; j++) {
        if (this.apiData[i].clicks[j] && this.maxClick < this.apiData[i].clicks[j].value)
          this.maxClick = this.apiData[i].clicks[j].value;
      }

      for (let j = 0; j < this.apiData[i].conversions.length; j++) {
        if (this.apiData[i].conversions[j] && this.maxConv < this.apiData[i].conversions[j].value)
          this.maxConv = this.apiData[i].conversions[j].value;
      }

      for (let j = 0; j < this.apiData[i].conversions.length; j++) {
        if (this.apiData[i].conversions[j] && this.maxImp < this.apiData[i].conversions[j].value)
          this.maxImp = this.apiData[i].conversions[j].value;
      }

      for (let j = 0; j < this.apiData[i].revenue.length; j++) {
        if (this.apiData[i].revenue[j] && this.maxRev < this.apiData[i].revenue[j].value)
          this.maxRev = this.apiData[i].revenue[j].value;
      }
    }
    console.log(this.maxClick, this.maxConv, this.maxImp, this.maxRev);
  }

  scale(min, max, value, target) {
    if (value == target) return 127;
    var OldMax = max;
    var OldMin = min;
    if (value < target) {
      var NewMax = 127;
      var NewMin = 0;
    } if (value > target) {
      var NewMax = 255;
      var NewMin = 127;
    }
    var OldRange = (OldMax - OldMin);
    var NewRange = (NewMax - NewMin);
    var NewValue = (((value - OldMin) * NewRange) / OldRange) + NewMin;
    return NewValue;
  }

  applyBg(type, val, index) {
    let r = 145;
    let g = this.scale(0, this.getMaxOfType(type), val, this.getTargetOfType(type));
    let b = 110;
    console.log('rgb( ' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')');
    return 'rgb( ' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
  }

  getMaxOfType(type: string) {
    switch (type) {
      case Constants.CLICKS:
        return this.maxClick;

      case Constants.REVENUE:
        return this.maxRev;

      case Constants.CONVERSIONS:
        return this.maxConv;

      case Constants.IMPRESSIONS:
        return this.maxImp;
    }
  }


  getTargetOfType(type: string) {
    switch (type) {
      case Constants.CLICKS:
        return this.maxClick/2;
      case Constants.REVENUE:
        return this.maxRev/2;
      case Constants.CONVERSIONS:
        return this.maxConv/2;
      case Constants.IMPRESSIONS:
        return this.maxImp/2;
    }
  }


}
