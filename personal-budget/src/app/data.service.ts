import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data: any;
  constructor(public http: HttpClient)  {
  }
  getData(): any{
   return this.http.get('http://localhost:3000/budget');
  }
  setVariable(){
    this.getData().subscribe((res: any) => {
      this.data = res;
      console.log(res);
      return this.data;
   });
  }
  getVariable(){
    if(this.data){
      return this.data;
    }else{
        this.setVariable();
       // return this.data;
    }
  }
}
