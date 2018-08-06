import { Component, OnInit } from '@angular/core';
import {FlextHandler} from 'flext';
import {InscripcionService} from './inscripcion.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css'],
    providers: [InscripcionService]
})
export class InscripcionComponent implements OnInit {

    controlNivel: number;
    controlBoton: boolean;
    dataGrados: {};
    dataPeriodosAny: any;
    dataPeriodosArray = [];
    periodoActual: number;
    indexInscripcion: number;

  constructor(private readonly service: InscripcionService) { }

  ngOnInit() {
      this.cargaDatos();
  }

  @FlextHandler()
  async cargaDatos() {
      this.controlNivel = 1;
      await this.cargaGrados();
      await this.cargaPeriodos();
  }

  formularioCreacion() {
      this.controlNivel = 2;
      this.iniciarFormulario();
  }

  @FlextHandler()
  async iniciarFormulario() {
      this.controlBoton = true;
      this.indexInscripcion = 1;
      await this.cargaGrados();
  }

  async cargaGrados() {
      this.dataGrados = await this.service.listadoGrados();
  }

  async cargaPeriodos() {
        this.dataPeriodosAny = await this.service.listadoPeriodos();
        this.dataPeriodosArray = this.dataPeriodosAny;
        const me = this;
        this.dataPeriodosArray.forEach(function (el, i) {
            if (el.periodoActual === true) {
                me.periodoActual = el.idPeriodo;
            }
        });
  }

  cerrarFormulario() {
      this.controlNivel = 1;
  }

  confirmarFormulario() {
      this.controlNivel = 1;
  }

}
