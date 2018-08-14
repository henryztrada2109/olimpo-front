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
        this.pathAdicional = '/seguridad/seguridad/tipoMenu/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    listadoRoles() {
        this.pathAdicional = '/seguridad/seguridad/role/consultaSelect';
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    creaGrado(data) {
        this.pathAdicional = '/datacenter/datacenter/grado/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoGrados(size, page) {
        this.pathAdicional = '/datacenter/datacenter/grado/consultaGeneral?page=' + page + '&size=' + size;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarGrado(data) {
        this.pathAdicional = '/datacenter/datacenter/grado/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    eliminarGrado(codigo) {
        this.pathAdicional = '/datacenter/datacenter/grado/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    creaSeccion(data) {
        this.pathAdicional = '/datacenter/datacenter/seccion/crear';
        return this.serviceGeneral.funtionPost(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    listadoSecciones(idGrado: number) {
        this.pathAdicional = '/datacenter/datacenter/seccion/consultaSelect/' + idGrado;
        return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }

    modificarSeccion(data) {
        this.pathAdicional = '/datacenter/datacenter/seccion/editar';
        return this.serviceGeneral.funtionPatch(this.pathAdicional, data, environment.puerto)
            .catch(Promise.reject);
    }

    eliminarSeccion(codigo) {
        this.pathAdicional = '/datacenter/datacenter/seccion/eliminar/' + codigo;
        return this.serviceGeneral.funtionDelete(this.pathAdicional, environment.puerto)
            .catch(Promise.reject);
    }
}
