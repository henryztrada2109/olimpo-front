import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../../shared/peticiones-http.service';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {

    pathAdicional = '';

    constructor(private serviceGeneral: PeticionesHttpService) { }

    crea(data) {
        this.pathAdicional = '/datacenter/v1/pais/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPagineo(size, page) {
        this.pathAdicional = '/datacenter/v1/pais/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    eliminar(codigo) {
        this.pathAdicional = '/datacenter/v1/pais/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificar(data) {
        this.pathAdicional = '/datacenter/v1/pais/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPagineoFiltro(size, page, consulta) {
        this.pathAdicional = '/datacenter/v1/pais/consultaFiltro/' + consulta + '?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    creaDepartamento(data) {
        this.pathAdicional = '/datacenter/v1/departamento/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPagineoDepartamento(size, page, idPais) {
        this.pathAdicional = '/datacenter/v1/departamento/consultaGeneral/' + idPais + '?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    eliminarDepartamento(codigo) {
        this.pathAdicional = '/datacenter/v1/departamento/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarDepartamento(data) {
        this.pathAdicional = '/datacenter/v1/departamento/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoPagineoFiltroDepartamento(size, page, consulta, idPais) {
        this.pathAdicional = '/datacenter/v1/departamento/consultaFiltro/' + consulta + '/' + idPais +'?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }
}
