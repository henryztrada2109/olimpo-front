import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ValidacionesInscripcionesService} from './shared/validaciones-inscripciones.service';
import {FlextHandler} from 'flext';

@Component({
  selector: 'app-validaciones-inscripciones',
  templateUrl: './validaciones-inscripciones.component.html',
  styleUrls: ['./validaciones-inscripciones.component.css'],
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
  ],
    providers: [ValidacionesInscripcionesService]
})
export class ValidacionesInscripcionesComponent implements OnInit {

    color = 'primary';
    dataRoles: any;
    listRoles = [];
    rolSeleccionado: number;
    codigoRol: number;
    validacionesAny: any;
    validacionesContro = {idRole: 0, periodo: false, nombres: false, apellidos: false, genero: false, fechaNacimiento: false,
        telefonoCasa: false, telefonoCelular: false, correoElectronico: false, profesion: false, estadoCivil: false, ocupacion: false,
    tipoIdentificacion: false, identificacion: false, pais: false, departamento: false, municipio: false, direccion: false};

  constructor(private readonly service: ValidacionesInscripcionesService) { }

  async ngOnInit() {
      await this.listadoRoles();
      this.rolSeleccionado = await 0;
      await this.cargarDatos();
  }

  async listadoRoles() {
      this.dataRoles = await this.service.listadoRoles();
      this.listRoles = await this.dataRoles;
  }

  @FlextHandler()
  async cargarDatos() {
      this.codigoRol = await this.listRoles[this.rolSeleccionado].idRole;
      this.validacionesAny = await this.service.datosCheckbox(this.codigoRol);
      await this.trasladaDatos();
  }

  async trasladaDatos() {
      this.validacionesContro.idRole = await this.codigoRol;
      this.validacionesContro.periodo = await this.validacionesAny.periodo;
      this.validacionesContro.nombres = await this.validacionesAny.nombres;
      this.validacionesContro.apellidos = await this.validacionesAny.apellidos;
      this.validacionesContro.genero = await this.validacionesAny.genero;
      this.validacionesContro.fechaNacimiento = await this.validacionesAny.fechaNacimiento;
      this.validacionesContro.telefonoCasa = await this.validacionesAny.telefonoCasa;
      this.validacionesContro.telefonoCelular = await this.validacionesAny.telefonoCelular;
      this.validacionesContro.correoElectronico = await this.validacionesAny.correoElectronico;
      this.validacionesContro.profesion = await this.validacionesAny.profesion;
      this.validacionesContro.estadoCivil = await this.validacionesAny.estadoCivil;
      this.validacionesContro.ocupacion = await this.validacionesAny.ocupacion;
      this.validacionesContro.tipoIdentificacion = await this.validacionesAny.tipoIdentificacion;
      this.validacionesContro.identificacion = await this.validacionesAny.identificacion;
      this.validacionesContro.pais = await this.validacionesAny.pais;
      this.validacionesContro.departamento = await this.validacionesAny.departamento;
      this.validacionesContro.municipio = await this.validacionesAny.municipio;
      this.validacionesContro.direccion = await this.validacionesAny.direccion;
  }

  async cambio() {
      this.service.modificarValidacion(this.validacionesContro);
  }

}
