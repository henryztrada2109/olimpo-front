import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesInscripcionesService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  listadoRoles() {
        this.pathAdicional = 'api/seguridad/v1/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
  }

  datosCheckbox(idRole) {
      this.pathAdicional = 'api/datacenter/v1/validacionesIns/consulta/' + idRole;
      return this.serviceGeneral.funtionGet(this.pathAdicional)
          .catch(Promise.reject);
  }

  modificarValidacion(data) {
        this.pathAdicional = 'api/datacenter/v1/validacionesIns/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
            .catch(Promise.reject);
  }

}
