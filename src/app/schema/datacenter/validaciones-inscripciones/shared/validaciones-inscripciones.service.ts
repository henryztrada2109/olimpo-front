import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {PeticionesHttpService} from '../../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesInscripcionesService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoRoles() {
        this.pathAdicional = '/seguridad/v1/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  datosCheckbox(idRole) {
      this.pathAdicional = '/datacenter/v1/validacionesIns/consulta/' + idRole;
      return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
          .catch(Promise.reject);
  }

  modificarValidacion(data) {
        this.pathAdicional = '/datacenter/v1/validacionesIns/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
  }

}
