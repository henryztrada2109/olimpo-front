import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) {}

    listadoGrados() {
        this.pathAdicional = '/datacenter/datacenter/grado/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPeriodos() {
        this.pathAdicional = '/datacenter/datacenter/periodo/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }
}
