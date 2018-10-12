import { Injectable } from '@angular/core';
import {PeticionesHttpService} from '../../shared/peticiones-http.service';

@Injectable({
  providedIn: 'root'
})
export class BarraLateralService {

  pathAdicional = '';

  constructor(private serviceGeneral: PeticionesHttpService) { }

  menuEstructura(codigo) {
    this.pathAdicional = 'api/seguridad/v1/menuPrincipal/estructuraMenu/' + codigo;
    return this.serviceGeneral.funtionGet(this.pathAdicional)
      .catch(Promise.reject);
  }
}
