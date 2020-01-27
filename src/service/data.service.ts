import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private baseservice: BaseService
  ) {

  }

  public getReportsData() {
    const url: string = '';
    return this.baseservice.get(url);

  }
}