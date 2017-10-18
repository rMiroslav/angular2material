import { Injectable } from '@angular/core';
import { Http, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilsService {
  private subject = new Subject<any>();
  _data: any;
  postData: any;
  deleteData:any;
  userUpdate:any;

  constructor(private http: Http) { }

  getAllUsers(){
    let url = "http://localhost:3000/_api/users";
     return this.http.get(url)
    .map(x => x.json() )
     .map( (data) => 
        this._data = data
      )
  }

  getUsers(index?, limit?){
    let url = "http://localhost:3000/_api/users/" + index + '/' + limit;
      
    return this.http.get(url)
    .map(x => x.json() )
     .map( (data) => 
        this._data = data
      )
  }
  postUser(data):  Observable<any>{
    const url = "http://localhost:3000/_api/user";
    // console.log(data);
    return this.http.post(url, data).map((data)=> {
      return data.json();
    })
  }
  getPostData(): Observable<any>{
     return this.subject.asObservable();
  }

  updateUser(id, body){
    const url = 'http://localhost:3000/_api/update/'
    return this.http.put( url + id, body).map(result=>
      this.userUpdate = result
    )
  }

  deleteUser(id){
    const url = 'http://localhost:3000/_api/user/'
    return this.http.delete(url + id ).map(result =>
      this.deleteData = result);
        // .catch(this.handleError);
  }

 

}
