import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay} from 'rxjs/operators';
import { environment } from './environments/environment';

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
      const username = localStorage.getItem('user');
      this.myDataObservable = this.http.post(`${environment.apiUrl}/getbudgetwithuser`,{username}).pipe(shareReplay());
      console.log("************** mydataobservable",this.myDataObservable);
      return this.myDataObservable;
    }
  }

}
