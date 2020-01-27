import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from 'src/service/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  title = 'ui';
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
      console.log(tableDataSource);
      this.dataSource = new MatTableDataSource(tableDataSource);
    });
  }

  rgb(r, g, b) {
    return 'rgb(' + [(r || 0), (g || 0), (b || 0)].join(',') + ')';
  }

  changeColour(number) {
    var ele = document.getElementsByClassName("color_code");
    ele[0].style.background = rgb(145, number, 110);
  }

  change() {
    var input = document.getElementById('input1');
    console.log("called", input.value);
    changeColour(input.value);
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



}
