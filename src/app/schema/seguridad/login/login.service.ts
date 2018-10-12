import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  validaUsuario(usuario: string, pass: string) {
    this.pathAdicional = 'api/seguridad/v1/usuario/validar/' + usuario + '/' + pass;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

}
