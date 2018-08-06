import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class TipoMenuService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoTipo(size, page) {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

}
