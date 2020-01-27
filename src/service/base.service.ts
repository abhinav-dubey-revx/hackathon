import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Error } from '../interfaces/error.interface';
import { ServerResponse } from '../interfaces/server-response.interface';
import { LoaderService } from '../shared-module/loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(
    public http: HttpClient,
    private loaderService: LoaderService
    ) {
  }
  public get(url, params?: HttpParams, headers?:HttpHeaders): Observable<any> {
    this.loaderService.show();
    let options = {};
    if (headers) {
      options['headers'] = headers;
    }
    if (params) {
      options['params'] = params;
    }
    if(!params && !headers) {
      return this.http.get(url).pipe(
        map(res => {
          this.loaderService.hide();
          return this.handleResponse(res);
        }), catchError(error => {
            this.loaderService.hide();
            return throwError(this.handleError(error))
          })
      )
    } else {
      return this.http.get(url, options).pipe(
        map(res => {
          this.loaderService.hide();
          return this.handleResponse(res);
        }),  
        catchError(error => {
          this.loaderService.hide();
          return throwError(this.handleError(error))
        })
      )
    }
  }


  public post(url, postBody: any, options?): Observable<any> {
    this.loaderService.show();
    if (options) {
      return this.http.post(url, postBody, options).pipe(
        map(res => {
          this.loaderService.hide();
          return this.handleResponse(res);
        }, 
        // TODO: catch err is not working
        catchError((error) => {
            this.loaderService.hide();
            return throwError(this.handleError(error))
          })
        )
      )    
    } else {
      return this.http.post(url, postBody).pipe(
        map(res => {
          this.loaderService.hide();
          return this.handleResponse(res);
        }, 
        // TODO: catch err is not working
        catchError((error) => {
          this.loaderService.hide();
          return throwError(this.handleError(error))
        })
        )  
      )
    }


  }
  public delete(url, postBody: any): Observable<any> {
    this.loaderService.show();
    return this.http.delete(url).pipe(
      map(res => {
        this.loaderService.hide();
      return this.handleResponse(res);
    }), catchError((error) => {
      this.loaderService.hide();
      return throwError(this.handleError(error))
    })
    )
  }

  public patch(url, patchData): Observable<any> {
    // this.helperService.startLoader();
    this.loaderService.show();
    return this.http.patch(url, patchData).pipe( 
      map(res => {
        this.loaderService.hide();
        return this.handleResponse(res);
      }, catchError(error => {
        this.loaderService.hide();
        return throwError(this.handleError(error))
      })
      ) 
    )
  }


  // upload(url: string, file: File) {
  //   const formData: FormData = new FormData();
  //   if (file) {
  //     formData.append('files', file, file.name);
  //   }
  //   // this.helperService.addContentTypeHeader = false;
  //   return this.post(url, formData);
  // }


  formUrlParam(url, data) {
    let queryString: string = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!queryString) {
          queryString = `?${key}=${data[key]}`;
        } else {
          queryString += `&${key}=${data[key]}`;
        }
      }
    }
    return url + queryString;
  }


  handleResponse(res): ServerResponse {
    // this.refreshToken(res);
    const data = res; // no need to .json http modules does that
    if (data && data.error) {
      const error: Error = { error: data.error, message: data.message };
      throw error;
    } else {
      return data;
    }
  }

  handleError(err) {
    if(err && err.error) {
      try {
        err.error = JSON.parse(err.error);
      } catch (e) {
        return err;
      }
    }
    return err;
  }
  // refreshToken(res) {
  //   const token = res.headers.get(appVariables.accessTokenServer);
  //   if (token) {
  //     localStorage.setItem(appVariables.accessTokenLocalStorage, `${token}`);
  //   }
  // }
}