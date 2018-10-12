import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoInscripcionesService {

  pathAdicional = '';

  constructor(private readonly serviceGeneral: PeticionesHttpService) { }

  modificar(data) {
      this.pathAdicional = 'api/datacenter/v1/estadosInscripciones/editar';
      return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
          .catch(Promise.reject);
  }

  listadoGeneral() {
      this.pathAdicional = 'api/datacenter/v1/estadosInscripciones/consultaSelect';
      return this.serviceGeneral.funtionGet(this.pathAdicional)
          .catch(Promise.reject);
  }
}
