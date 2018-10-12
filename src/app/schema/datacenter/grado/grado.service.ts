import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

    pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

    listadoTipos() {
        this.pathAdicional = 'api/seguridad/v1/tipoMenu/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    listadoRoles() {
        this.pathAdicional = 'api/seguridad/v1/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    creaGrado(data) {
        this.pathAdicional = 'api/datacenter/v1/grado/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    listadoGrados(size, page) {
        this.pathAdicional = 'api/datacenter/v1/grado/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    listadoGradosFiltro(size, page, idGrado) {
        this.pathAdicional = 'api/datacenter/v1/grado/consultaGeneralFiltro/' + idGrado + '?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    listadoFiltro(filtro) {
        this.pathAdicional = 'api/datacenter/v1/grado/consultaFiltro/' + filtro;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    listadoSelect() {
        this.pathAdicional = 'api/datacenter/v1/grado/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    modificarGrado(data) {
        this.pathAdicional = 'api/datacenter/v1/grado/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    eliminarGrado(codigo) {
        this.pathAdicional = 'api/datacenter/v1/grado/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional)
            .catch(Promise.reject);
    }

    creaSeccion(data) {
        this.pathAdicional = 'api/datacenter/v1/seccion/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    listadoSecciones(idGrado: number) {
        this.pathAdicional = 'api/datacenter/v1/seccion/consultaSelect/' + idGrado;
        return this.serviceGeneral.funtionGet(this.pathAdicional)
            .catch(Promise.reject);
    }

    modificarSeccion(data) {
        this.pathAdicional = 'api/datacenter/v1/seccion/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data)
            .catch(Promise.reject);
    }

    eliminarSeccion(codigo) {
        this.pathAdicional = 'api/datacenter/v1/seccion/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional)
            .catch(Promise.reject);
    }
}
