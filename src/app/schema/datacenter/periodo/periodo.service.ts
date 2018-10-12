import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) { }

    crea(data) {
        this.pathAdicional = 'api/datacenter/v1/periodo/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    listadoPagineo(size, page) {
        this.pathAdicional = 'api/datacenter/v1/periodo/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    modificarPeriodoActual(id) {
        this.pathAdicional = 'api/datacenter/v1/periodo/actualizaPeriodoActual/' + id;
        return this.serviceGeneral.funtionPatchPorPath(this.pathAdicional)
            .catch(Promise.reject);
    }

    eliminar(codigo) {
        this.pathAdicional = 'api/datacenter/v1/periodo/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional)
            .catch(Promise.reject);
    }

    modificarPeriodo(data) {
        this.pathAdicional = 'api/datacenter/v1/periodo/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
            .catch(Promise.reject);
    }
}
