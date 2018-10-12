import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class TipoMenuService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoTipo(size, page) {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional)
      .catch(Promise.reject);
  }

}
