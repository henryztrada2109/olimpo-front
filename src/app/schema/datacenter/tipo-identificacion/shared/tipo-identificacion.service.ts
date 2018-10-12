import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) { }

    crea(data) {
        this.pathAdicional = 'api/datacenter/v1/tipoIdentificacion/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    listadoPagineo(size, page) {
        this.pathAdicional = 'api/datacenter/v1/tipoIdentificacion/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    eliminar(codigo) {
        this.pathAdicional = 'api/datacenter/v1/tipoIdentificacion/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional)
            .catch(Promise.reject);
    }

    modificar(data) {
        this.pathAdicional = 'api/datacenter/v1/tipoIdentificacion/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    listadoPagineoFiltro(size, page, consulta) {
        this.pathAdicional = 'api/datacenter/v1/tipoIdentificacion/consultaFiltro/' + consulta + '?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }
}
