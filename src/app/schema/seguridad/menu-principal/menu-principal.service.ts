import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  pathAdicional = '';

  constructor(private readonly serviceGeneral: PeticionesHttpService) { }

  listadoTipo() {
    this.pathAdicional = '/seguridad/v1/tipoMenu/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoIconos() {
    this.pathAdicional = '/seguridad/v1/iconos/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  getIcono(id) {
    this.pathAdicional = '/seguridad/v1/iconos/consultaDetalle/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoOpciones() {
    this.pathAdicional = '/seguridad/v1/opciones/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  modificarMenuPrincipal(data) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  listadoMenuPrincipal(id) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  eliminarMenuPrincipal(codigo) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  creaMenuSecundario(data) {
    this.pathAdicional = '/seguridad/v1/menuSecundario/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  listadoMenuSecundario(id) {
    this.pathAdicional = '/seguridad/v1/menuSecundario/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  eliminarMenuSecundario(codigo) {
    this.pathAdicional = '/seguridad/v1/menuSecundario/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  modificarMenuSecundario(data) {
    this.pathAdicional = '/seguridad/v1/menuSecundario/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }
}
