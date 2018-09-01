import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PeticionesHttpService} from '../../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

    pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

    listadoTipos() {
        this.pathAdicional = '/seguridad/v1/tipoMenu/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoRoles() {
        this.pathAdicional = '/seguridad/v1/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    creaGrado(data) {
        this.pathAdicional = '/datacenter/v1/grado/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoGrados(size, page) {
        this.pathAdicional = '/datacenter/v1/grado/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarGrado(data) {
        this.pathAdicional = '/datacenter/v1/grado/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    eliminarGrado(codigo) {
        this.pathAdicional = '/datacenter/v1/grado/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    creaSeccion(data) {
        this.pathAdicional = '/datacenter/v1/seccion/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoSecciones(idGrado: number) {
        this.pathAdicional = '/datacenter/v1/seccion/consultaSelect/' + idGrado;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarSeccion(data) {
        this.pathAdicional = '/datacenter/v1/seccion/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    eliminarSeccion(codigo) {
        this.pathAdicional = '/datacenter/v1/seccion/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }
}
