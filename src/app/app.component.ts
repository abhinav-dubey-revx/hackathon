import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from 'src/service/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Constants } from './Constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/shared-module/loader/loader.service';


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

  listSearchForm: FormGroup;
  searchedList = [];

  apiData: any[] = [];
  maxClick: number = 0;
  maxConv: number = 0;
  maxImp: number = 0;
  maxRev: number = 0;
  // title = 'ui';
  expandedElement: any;
  displayedColumns: any[] = ['engagementName', 'segmentName', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  showProgressBar: boolean;

  constructor(
    private dataservice: DataService,
    private formBuilder: FormBuilder,
    private LoaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.showProgressBar = true;
    this.dataservice.getReportsData().then(res => {
      let tableDataSource = this.dataservice.formatData(res);
      this.apiData = tableDataSource;
      this.dataSource = new MatTableDataSource(tableDataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showProgressBar = false;
      console.log(tableDataSource)

    });
  }

  applyBg(type, val, index) {
    let r = 145;
    let g = val;
    let b = 110;
    // console.log('rgb( ' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')');
    return 'rgb( ' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
  }

  getMaxOfType(type: string) {
    switch (type) {
      case Constants.CLICKS:
        // return this.maxClick;
        return this.dataservice.maxclick

      case Constants.REVENUE:
        // return this.maxRev;
        return this.dataservice.maxrev

      case Constants.CONVERSIONS:
        // return this.maxConv;
        return this.dataservice.maxconver

      case Constants.IMPRESSIONS:
        // return this.maxImp;
        return this.dataservice.maximp
    }
  }

  applySearchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
