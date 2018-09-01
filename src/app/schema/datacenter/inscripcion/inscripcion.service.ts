import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) {}

    listadoGrados(): Promise<any[]> {
        this.pathAdicional = '/datacenter/v1/grado/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPeriodos() {
        this.pathAdicional = '/datacenter/v1/periodo/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    validaciones(idRole: number) {
        this.pathAdicional = `/datacenter/v1/validacionesIns/consulta/${idRole}`;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoProfesiones(): Promise<any[]> {
        this.pathAdicional = '/datacenter/v1/profesion/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoEstadosCiviles(): Promise<any[]> {
        this.pathAdicional = '/datacenter/v1/estadoCivil/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }
}
