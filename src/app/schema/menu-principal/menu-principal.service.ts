import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  pathAdicional = '';

  constructor(private readonly serviceGeneral: PeticionesHttpService) { }

  listadoTipo() {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoIconos() {
    this.pathAdicional = '/seguridad/seguridad/iconos/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  getIcono(id) {
    this.pathAdicional = '/seguridad/seguridad/iconos/consultaDetalle/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoOpciones() {
    this.pathAdicional = '/seguridad/seguridad/opciones/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = '/seguridad/seguridad/menuPrincipal/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  modificarMenuPrincipal(data) {
    this.pathAdicional = '/seguridad/seguridad/menuPrincipal/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  listadoMenuPrincipal(id) {
    this.pathAdicional = '/seguridad/seguridad/menuPrincipal/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  eliminarMenuPrincipal(codigo) {
    this.pathAdicional = '/seguridad/seguridad/menuPrincipal/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  creaMenuSecundario(data) {
    this.pathAdicional = '/seguridad/seguridad/menuSecundario/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  listadoMenuSecundario(id) {
    this.pathAdicional = '/seguridad/seguridad/menuSecundario/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  eliminarMenuSecundario(codigo) {
    this.pathAdicional = '/seguridad/seguridad/menuSecundario/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  modificarMenuSecundario(data) {
    this.pathAdicional = '/seguridad/seguridad/menuSecundario/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }
}
