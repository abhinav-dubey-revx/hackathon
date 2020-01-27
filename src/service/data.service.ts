import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private baseservice: BaseService
  ) {}

  getReportsData(): Promise<any> {
    const url: string = 'http://10.0.72.124:3000/-/v1/campaignGroup/75/campaignGroupReport?access_token=4aa6357946e6fd7b84743469c3cef9d94ff12072';
    return this.baseservice.get(url).toPromise();

  }

  formatData(input) {
    let result = [];
    for (var camp of Object.keys(input.data[0]) ) { // campaign loop
      var campObj = input.data[0];
      for (var segment of Object.keys(campObj[camp])) { //segment loop
        var segObj = campObj[camp][segment];
        for(var channel of Object.keys(segObj)) { // channel loop
          var channelObj = segObj[channel];
          for(var engagement of Object.keys(channelObj)) {
            var engObj = channelObj[engagement];
            var obj = {
              engagementName: engagement,
              segmentName: segment,
              impressions: [],
              clicks:[],
              conversions: [],
              revenue: []
            }
            if(Object.keys(engObj).length >0) {
              for(var parameter of Object.keys(engObj)) {
                if(engObj[parameter].impressions) obj.impressions.push({value: engObj[parameter].impressions, date: parameter});
                if(engObj[parameter].clicks) obj.clicks.push({value: engObj[parameter].clicks, date: parameter});
                if(engObj[parameter].conversions) obj.conversions.push({value: engObj[parameter].conversions, date: parameter});
                if(engObj[parameter].revenue) obj.revenue.push({value: engObj[parameter].revenue, date: parameter});
              }
              result.push(obj);

            }
          }
        }
      }
    }
    return result;
  }
  
  /**
   * logic: NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
   * @param {*} min 
   * @param {*} max 
   */
  scale(min, max, value, target) {
    if(value == target) return 127;
    var OldMax = max;
    var OldMin = min;
    if(value < target) {
      var NewMax = 127;
      var NewMin = 0;
    } if(value > target) {
      var NewMax = 255;
      var NewMin = 127;
    }
    var OldRange = (OldMax - OldMin);
    var NewRange = (NewMax - NewMin);  
    var NewValue = (((value - OldMin) * NewRange) / OldRange) + NewMin;
    return NewValue;
  }
}
