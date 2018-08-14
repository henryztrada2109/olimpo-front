import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoRole(size, page) {
    this.pathAdicional = '/seguridad/seguridad/role/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = '/seguridad/seguridad/role/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = '/seguridad/seguridad/role/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = '/seguridad/seguridad/role/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  listadoTipo() {
    this.pathAdicional = '/seguridad/seguridad/tipoMenu/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }

  creaValidaciones(idRole) {
        this.pathAdicional = '/datacenter/datacenter/validacionesIns/crear/' + idRole;
        return this.serviceGeneral.funtionPostPorPath(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  validacionGradoRelacionado(idRole) {
        this.pathAdicional = '/datacenter/datacenter/grado/validacion/' + idRole;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  eliminarValidaciones(codigo) {
      this.pathAdicional = '/datacenter/datacenter/validacionesIns/eliminar/' + codigo;
      return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
          .catch(Promise.reject);
  }
}
