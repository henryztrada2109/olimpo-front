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
        this.pathAdicional = '/seguridad/seguridad/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  datosCheckbox(idRole) {
      this.pathAdicional = '/datacenter/datacenter/validacionesIns/consulta/' + idRole;
      return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
          .catch(Promise.reject);
  }

  modificarValidacion(data) {
        this.pathAdicional = '/datacenter/datacenter/validacionesIns/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
  }

}
