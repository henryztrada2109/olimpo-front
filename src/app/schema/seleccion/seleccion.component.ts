import { Component, OnInit } from '@angular/core';
import {SeleccionService} from './seleccion.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css'],
  providers: [SeleccionService],
  animations: [
    trigger('enterState', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate(500, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class SeleccionComponent implements OnInit {

  dataEmpresa: any = [];
  usuarioDto: any;

  constructor(private router: Router,
              private readonly service: SeleccionService) { }

  ngOnInit() {
    localStorage.removeItem('empresa');
    this.validaEmpresa();
    this.listado();
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('empresa');
    this.router.navigate(['/login']);
  }

  async listado() {
    this.dataEmpresa = await this.service.listadoEmpresas(localStorage.getItem('idUsuario'));
  }

  seleccion(empresa) {
    localStorage.setItem('empresa', empresa.idEmpresa);
    this.router.navigate(['/inicio']);
  }

  async validaEmpresa() {
    this.usuarioDto = await this.service.validaEmpresas(localStorage.getItem('idUsuario'));
    if (this.usuarioDto.code === 21) {
      localStorage.setItem('empresa', this.usuarioDto.idEmpresa);
      this.router.navigate(['/inicio']);
    }
  }

}
