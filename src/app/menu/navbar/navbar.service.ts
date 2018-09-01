import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  getEmpresa(idEmpresa) {
    this.pathAdicional = '/seguridad/v1/empresa/consulta/' + idEmpresa;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  menuEstructura(codigo) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/estructuraMenu/' + codigo;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }
}
