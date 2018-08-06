import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from './navbar.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NavbarService]
})
export class NavbarComponent implements OnInit {

  empresa: any;
  nombreEmpresa: '';
  nombreModulo: string;
  dataEstructura: {};

  constructor(private router: Router,
              private readonly service: NavbarService) {}

  ngOnInit() {
    this.cargarDatos();
    this.listadoEstructura();
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('empresa');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('tipoMenu');
    this.router.navigate(['/login']);
  }

  async cargarDatos() {
    this.empresa = await this.service.getEmpresa(localStorage.getItem('empresa'));
    this.nombreEmpresa = this.empresa.nombre;
    this.nombreModulo = environment.nombreModulo;
  }

  async listadoEstructura() {
    this.dataEstructura = await this.service.menuEstructura(localStorage.getItem('tipoMenu'));
  }

}
