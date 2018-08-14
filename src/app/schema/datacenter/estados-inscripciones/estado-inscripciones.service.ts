import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoInscripcionesService {

  pathAdicional = '';

  constructor(private readonly serviceGeneral: PeticionesHttpService) { }

  modificar(data) {
      this.pathAdicional = '/datacenter/datacenter/estadosInscripciones/editar';
      return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
          .catch(Promise.reject);
  }

  listadoGeneral() {
      this.pathAdicional = '/datacenter/datacenter/estadosInscripciones/consultaSelect';
      return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
          .catch(Promise.reject);
  }
}
