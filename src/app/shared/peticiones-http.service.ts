import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PeticionesHttpService {

  constructor(private http: HttpClient) { }
  funtionGet(pathAdicional: string): Promise<any> {
        return this.http.get(pathAdicional, httpOptions).toPromise();
  }
  funtionPost(pathAdicional: string, data) {
    return this.http.post(pathAdicional, JSON.stringify(data), httpOptions).toPromise();
  }
  funtionPostPorPath(pathAdicional: string) {
        return this.http.post(pathAdicional, httpOptions).toPromise();
  }
  funtionPatch(pathAdicional: string, data) {
    return this.http.patch(pathAdicional, data, httpOptions).toPromise();
  }
  funtionPatchPorPath(pathAdicional: string) {
    return this.http.patch(pathAdicional, httpOptions).toPromise();
  }
  funtionDelete(pathAdicional: string) {
    return this.http.delete(pathAdicional).toPromise();
  }

  // PRUEBAS
    getJSON(json) {
        return this.http.get(json).toPromise();
    }

}
