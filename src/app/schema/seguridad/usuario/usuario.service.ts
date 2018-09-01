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
    this.pathAdicional = '/seguridad/v1/usuario/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoFiltroRol(size, page, rol) {
    this.pathAdicional = '/seguridad/v1/usuario/consultaFiltroRol/' + rol + '?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoFiltroUsuario(size, page, usuario) {
    this.pathAdicional = '/seguridad/v1/usuario/consultaFiltroUsuario/' + usuario + '?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoFiltroUsuarioRol(size, page, usuario, rol) {
    this.pathAdicional = '/seguridad/v1/usuario/consultaFiltroUsuarioAndRol/' + usuario + '/' + rol + '?page=' + page + '&size='
        + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  crea(data, id) {
    this.pathAdicional = '/seguridad/v1/usuario/crear/' + id;
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = '/seguridad/v1/usuario/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = '/seguridad/v1/usuario/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoRoles() {
    this.pathAdicional = '/seguridad/v1/role/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoTipos() {
        this.pathAdicional = '/seguridad/v1/tipoMenu/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

}
