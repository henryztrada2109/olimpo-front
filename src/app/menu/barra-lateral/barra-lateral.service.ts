import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class BarraLateralService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  menuEstructura(codigo) {
    this.pathAdicional = '/seguridad/v1/menuPrincipal/estructuraMenu/' + codigo;
    return this.serviceGeneral.funtionGet(this.pathAdicional, environment.puerto)
      .catch(Promise.reject);
  }
}
