import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpSrv: HttpClient) { }

  public get(url: string) {
    return new Promise((resolve, reject) => {
      this.httpSrv.get(url).subscribe({
        next(value) {
          resolve(value);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
}
