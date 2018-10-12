import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  pathAdicional = '';

  constructor(private readonly serviceGeneral: PeticionesHttpService) { }

  listadoTipo() {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoIconos() {
    this.pathAdicional = 'api/seguridad/v1/iconos/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  getIcono(id) {
    this.pathAdicional = 'api/seguridad/v1/iconos/consultaDetalle/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoOpciones() {
    this.pathAdicional = 'api/seguridad/v1/opciones/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  modificarMenuPrincipal(data) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  listadoMenuPrincipal(id) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  eliminarMenuPrincipal(codigo) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional)
      .catch(Promise.reject);
  }

  creaMenuSecundario(data) {
    this.pathAdicional = 'api/seguridad/v1/menuSecundario/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  listadoMenuSecundario(id) {
    this.pathAdicional = 'api/seguridad/v1/menuSecundario/consultaSelect/' + id;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  eliminarMenuSecundario(codigo) {
    this.pathAdicional = 'api/seguridad/v1/menuSecundario/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional)
      .catch(Promise.reject);
  }

  modificarMenuSecundario(data) {
    this.pathAdicional = 'api/seguridad/v1/menuSecundario/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
      .catch(Promise.reject);
  }
}
