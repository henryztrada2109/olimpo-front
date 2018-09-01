import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  validaUsuario(usuario: string, pass: string) {
    this.pathAdicional = '/seguridad/v1/usuario/validar/' + usuario + '/' + pass;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

}
