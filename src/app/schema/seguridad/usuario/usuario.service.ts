import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoUsuario(size, page) {
    this.pathAdicional = 'api/seguridad/v1/usuario/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoFiltroRol(size, page, rol) {
    this.pathAdicional = 'api/seguridad/v1/usuario/consultaFiltroRol/' + rol + '?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoFiltroUsuario(size, page, usuario) {
    this.pathAdicional = 'api/seguridad/v1/usuario/consultaFiltroUsuario/' + usuario + '?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoFiltroUsuarioRol(size, page, usuario, rol) {
    this.pathAdicional = 'api/seguridad/v1/usuario/consultaFiltroUsuarioAndRol/' + usuario + '/' + rol + '?page=' + page + '&size='
        + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  crea(data, id) {
    this.pathAdicional = 'api/seguridad/v1/usuario/crear/' + id;
    return this.serviceGeneral.funtionPost(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = 'api/seguridad/v1/usuario/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = 'api/seguridad/v1/usuario/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoRoles() {
    this.pathAdicional = 'api/seguridad/v1/role/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoTipos() {
        this.pathAdicional = 'api/seguridad/v1/tipoMenu/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
  }

}
