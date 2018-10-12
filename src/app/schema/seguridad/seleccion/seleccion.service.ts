import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoEmpresas(id) {
    this.pathAdicional = 'api/seguridad/v1/empresa/empresasPorUsuario/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  validaEmpresas(id) {
    this.pathAdicional = 'api/seguridad/v1/empresa/validaEmpresasPorUsuario/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }
}
