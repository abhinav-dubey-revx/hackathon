import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

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
}