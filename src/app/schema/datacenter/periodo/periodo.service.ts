import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) { }

    crea(data) {
        this.pathAdicional = '/datacenter/v1/periodo/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPagineo(size, page) {
        this.pathAdicional = '/datacenter/v1/periodo/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarPeriodoActual(id) {
        this.pathAdicional = '/datacenter/v1/periodo/actualizaPeriodoActual/' + id;
        return this.serviceGeneral.funtionPatchPorPath(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    eliminar(codigo) {
        this.pathAdicional = '/datacenter/v1/periodo/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarPeriodo(data) {
        this.pathAdicional = '/datacenter/v1/periodo/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }
}
