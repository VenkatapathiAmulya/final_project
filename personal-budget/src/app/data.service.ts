import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService  {
  myDataObservable: Observable<any>;

  // public data: any;
  constructor(private http: HttpClient)  {
  }

  getData(): Observable<any> {
    if (this.myDataObservable) {
      return this.myDataObservable;
    } else {
      this.myDataObservable = this.http.get('http://localhost:3000/budget').pipe(shareReplay());
      return this.myDataObservable;
    }
  }

}
