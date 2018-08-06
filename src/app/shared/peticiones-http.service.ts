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
  funtionGet(pathAdicional: string, puerto: string) {
    return this.http.get(environment.ipBase + puerto + pathAdicional, httpOptions).toPromise();
  }
  funtionPost(pathAdicional: string, data, puerto: string) {
    return this.http.post( environment.ipBase + puerto + pathAdicional, JSON.stringify(data), httpOptions).toPromise();
  }
  funtionPatch(pathAdicional: string, data, puerto: string) {
    return this.http.patch(environment.ipBase + puerto + pathAdicional, data, httpOptions).toPromise();
  }
  funtionPatchPorPath(pathAdicional: string, puerto: string) {
    return this.http.patch(environment.ipBase + puerto + pathAdicional, httpOptions).toPromise();
  }
  funtionDelete(pathAdicional: string, puerto: string) {
    return this.http.delete(environment.ipBase + puerto + pathAdicional).toPromise();
  }

  // PRUEBAS
    getJSON(json) {
        return this.http.get(json).toPromise();
    }

}
