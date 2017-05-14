import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Coordinate} from '../domain/coordinate';

/*
 Generated class for the TodoService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LocatorService {
  todosUrl = "http://213.222.183.206:8000/api/coords"

  constructor(public http: Http) {
    console.log('Hello Locator Provider');
  }

  // Get all todos
  public load(): Observable<Coordinate[]> {
    return this.http.get(this.todosUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    alert("Error: " + error);
    return Observable.throw(error.json().error || 'Server error');
  }

  // Add a todo-edit
  public save(deviceId: any, longitude : any, latitude : any) {
    let newCoordinate = new Coordinate(deviceId, longitude, latitude);
    let body = JSON.stringify(newCoordinate);
    alert('Save position invoked: ' + body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.todosUrl, body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }
}
