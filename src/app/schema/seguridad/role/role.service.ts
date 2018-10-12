import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoRole(size, page) {
    this.pathAdicional = 'api/seguridad/v1/role/consultaGeneral?page=' + page + '&size=' + size;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  crea(data) {
    this.pathAdicional = 'api/seguridad/v1/role/crear';
    return this.serviceGeneral.funtionPost(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  modificar(data) {
    this.pathAdicional = 'api/seguridad/v1/role/editar';
    return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
      .catch(Promise.reject);
  }

  eliminar(codigo) {
    this.pathAdicional = 'api/seguridad/v1/role/eliminar/' + codigo;
    return this.serviceGeneral.funtionDelete(this.pathAdicional)
      .catch(Promise.reject);
  }

  listadoTipo() {
    this.pathAdicional = 'api/seguridad/v1/tipoMenu/consultaSelect';
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }

  creaValidaciones(idRole) {
        this.pathAdicional = 'api/datacenter/v1/validacionesIns/crear/' + idRole;
        return this.serviceGeneral.funtionPostPorPath(this.pathAdicional)
            .catch(Promise.reject);
  }

  validacionGradoRelacionado(idRole) {
        this.pathAdicional = 'api/datacenter/v1/grado/validacion/' + idRole;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
  }

  eliminarValidaciones(codigo) {
      this.pathAdicional = 'api/datacenter/v1/validacionesIns/eliminar/' + codigo;
      return this.serviceGeneral.funtionDelete(this.pathAdicional)
          .catch(Promise.reject);
  }
}
