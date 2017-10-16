import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UtilsService {
  _data: any

  constructor(private http: Http) { }

  getUsers(){
    const url = "http://localhost:3000/_api/users";
    return this.http.get(url)
    .map(x => x.json() )
     .map( (data) => 
        this._data = data
      )
  }
  postUser(data){
    const url = "http://localhost:3000/_api/user";
    // console.log(data);
    this.http.post(url, data).subscribe(result=> console.log(result))
  }

}
