import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  getEmpresa(idEmpresa) {
    this.pathAdicional = 'api/seguridad/v1/empresa/consulta/' + idEmpresa;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  menuEstructura(codigo) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/estructuraMenu/' + codigo;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }
}
