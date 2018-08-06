import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BarraLateralService} from './barra-lateral.service';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit {

  menuParametrizacion: boolean;
  menuSeguridad: boolean;
  dataEstructura: {};

  constructor(private readonly router: Router,
              private readonly service: BarraLateralService) { }

  ngOnInit() {
    this.menuParametrizacion = false;
    this.menuSeguridad = false;
    this.listadoEstructura();
  }

  cambioEmpresa() {
    localStorage.removeItem('empresa');
    this.router.navigate(['/seleccion']);
  }

  async listadoEstructura() {
    this.dataEstructura = await this.service.menuEstructura(localStorage.getItem('tipoMenu'));
  }

}
