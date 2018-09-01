import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {PeticionesHttpService} from '../../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  crea(data) {
        this.pathAdicional = '/datacenter/v1/estadoCivil/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
  }

  listadoPagineo(size, page) {
        this.pathAdicional = '/datacenter/v1/estadoCivil/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  eliminar(codigo) {
        this.pathAdicional = '/datacenter/v1/estadoCivil/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
  }

  modificar(data) {
        this.pathAdicional = '/datacenter/v1/estadoCivil/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
  }
}
