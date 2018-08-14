import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PeriodoService} from './periodo.service';
import swal from 'sweetalert2';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
    providers: [PeriodoService],
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
export class PeriodoComponent implements OnInit {

  tituloModal: string;
  messageDescripcion: boolean;
  textoMensaje: string;
  controlBoton: boolean;
  inputDisabled: boolean;
  focusCodigo: boolean;
  fechaInicial = {year: 0, month: 0, day: 0};
  fechaFinal = {year: 0, month: 0, day: 0};
  periodoJson = {idPeriodo: 0, descripcion: '', diaInicio: 0, mesInicio: 0, anioInicio: 0, diaFin: 0, mesFin: 0, anioFin: 0,
      periodoActual: false};
  modalReference: NgbModalRef;
  messageFechaInicial: boolean;
  messageFechaFinal: boolean;
  controFuncion: number;
  periodoDto: any;
  dataPeriodo: {};
  data: any;
  length: number;
  pageSize = 10;
  pageIndex = 0;
    pageEvent: PageEvent;

  constructor(private readonly modalService: NgbModal,
              private readonly service: PeriodoService) { }

  ngOnInit() {
      this.listadoPagineo(this.pageSize, this.pageIndex);
  }

  open(content) {
    this.tituloModal = 'Nuevo periodo'
    this.iniciarModal();
    this.controFuncion = 1;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  iniciarModal() {
    this.inputDisabled = false;
    this.controlBoton = true;
    this.periodoJson.idPeriodo = null;
    this.detenerAlertas();
    this.periodoJson.descripcion = null;
    this.fechaInicial.year = 0;
    this.fechaInicial.month = 0;
    this.fechaInicial.day = 0;
    this.fechaFinal.year = 0;
    this.fechaFinal.month = 0;
    this.fechaFinal.day = 0;
  }

  detenerAlertas() {
    this.messageDescripcion = false;
    this.messageFechaInicial = false;
    this.messageFechaFinal = false;
    this.textoMensaje = '';
  }

  closeModal() {
    this.modalReference.close();
  }

  confirmaModal() {
    if (this.periodoJson.descripcion === '' || this.periodoJson.descripcion == null) {
        this.detenerAlertas();
        this.messageDescripcion = true;
        this.textoMensaje = 'Debe ingresar la descripcion del periodo';
    } else if (this.fechaInicial === null) {
        this.detenerAlertas();
        this.messageFechaInicial = true;
        this.textoMensaje = 'Debe ingresar una fecha inicial.';
    } else if (this.fechaInicial.year === undefined) {
        this.detenerAlertas();
        this.messageFechaInicial = true;
        this.textoMensaje = 'Debe ingresar una fecha valida.';
    } else if (this.fechaFinal === null) {
        this.detenerAlertas();
        this.messageFechaFinal = true;
        this.textoMensaje = 'Debe ingresar una fecha inicial.';
    } else if (this.fechaFinal.year === undefined) {
        this.detenerAlertas();
        this.messageFechaFinal = true;
        this.textoMensaje = 'Debe ingresar una fecha valida.';
    } else {
        this.detenerAlertas();
        this.periodoJson.diaInicio = this.fechaInicial.day;
        this.periodoJson.mesInicio = this.fechaInicial.month;
        this.periodoJson.anioInicio = this.fechaInicial.year;
        this.periodoJson.diaFin = this.fechaFinal.day;
        this.periodoJson.mesFin = this.fechaFinal.month;
        this.periodoJson.anioFin = this.fechaFinal.year;
        if (this.controFuncion === 1) {
            this.creaPeriodo();
        } else {
            this.modificaPeriodo();
        }
    }
  }

  colocarPeriodoActual(periodo) {
      swal({
          title: 'Advertencia',
          text: 'Realmente decea actualizar el periodo actual?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, Acepto!'
      }).then((result) => {
          if (result.value) {
              this.actualizarPeriodoActual(periodo.idPeriodo);
          }
      });
  }

  funcionEliminar(periodo) {
      swal({
          title: 'Advertencia',
          text: 'Deceo eliminar el periodo?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, Acepto!'
      }).then((result) => {
          if (result.value) {
              this.eliminarPeriodo(periodo.idPeriodo);
          }
      });
  }

  funcionVisualizar(periodo, content) {
      this.tituloModal = 'Detalle periodo';
      this.iniciarModal();
      this.controlBoton = false;
      this.periodoJson.descripcion = periodo.descripcion;
      this.periodoJson.periodoActual = periodo.periodoActual;
      this.fechaInicial.year = periodo.anioInicio;
      this.fechaInicial.month = periodo.mesInicio;
      this.fechaInicial.day = periodo.diaInicio;
      this.fechaFinal.year = periodo.anioFin;
      this.fechaFinal.month = periodo.mesFin;
      this.fechaFinal.day = periodo.diaFin;
      this.periodoJson.anioInicio = periodo.anioInicio;
      this.periodoJson.mesInicio = periodo.mesInicio;
      this.periodoJson.diaInicio = periodo.diaInicio;
      this.periodoJson.anioFin = periodo.anioFin;
      this.periodoJson.mesFin = periodo.mesFin;
      this.periodoJson.diaFin = periodo.diaFin;
      this.periodoJson.idPeriodo = periodo.idPeriodo;
      this.inputDisabled = true;
      this.modalReference = this.modalService.open(content, {centered: true});
  }

    funcionModificar(periodo, content) {
        this.tituloModal = 'Detalle periodo'
        this.iniciarModal();
        this.controlBoton = true;
        this.periodoJson.descripcion = periodo.descripcion;
        this.periodoJson.periodoActual = periodo.periodoActual;
        this.fechaInicial.year = 2018;
        this.fechaInicial.month = periodo.mesInicio;
        this.fechaInicial.day = periodo.diaInicio;
        this.fechaFinal.year = periodo.anioFin;
        this.fechaFinal.month = periodo.mesFin;
        this.fechaFinal.day = periodo.diaFin;
        this.periodoJson.anioInicio = periodo.anioInicio;
        this.periodoJson.mesInicio = periodo.mesInicio;
        this.periodoJson.diaInicio = periodo.diaInicio;
        this.periodoJson.anioFin = periodo.anioFin;
        this.periodoJson.mesFin = periodo.mesFin;
        this.periodoJson.diaFin = periodo.diaFin;
        this.periodoJson.idPeriodo = periodo.idPeriodo;
        this.controFuncion = 2;
        this.modalReference = this.modalService.open(content, {centered: true});
    }

  /* Controladores  */

    async creaPeriodo() {
        this.periodoDto = await this.service.crea(this.periodoJson);
        if (this.periodoDto.code === 50) {
            this.messageFechaFinal = true;
            this.textoMensaje = 'Fecha final debe ser mayor a fecha inicial.';
        } else {
            this.modalReference.close();
            this.listadoPagineo(this.pageSize, this.pageIndex);
            swal({
                title: 'Exito!',
                text: 'Periodo ingresado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        }
    }

    async listadoPagineo(size, page) {
        this.data = await this.service.listadoPagineo(size, page);
        this.dataPeriodo = this.data.content;
        this.length = this.data.totalElements;
    }

    refrescar($evento) {
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        return $evento;
    }

    async actualizarPeriodoActual(id) {
        this.periodoDto = await this.service.modificarPeriodoActual(id);
        this.listadoPagineo(this.pageSize, this.pageIndex);
        swal({
            title: 'Exito!',
            text: 'Periodo actual modificado con exito.',
            type: 'success',
            confirmButtonText: 'Ok'
        });
    }

    async eliminarPeriodo(id) {
        this.periodoDto = await this.service.eliminar(id);
        if (this.periodoDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Periodo se encuentra relacionado.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            this.listadoPagineo(this.pageSize, this.pageIndex);
            swal({
                title: 'Exito!',
                text: 'Periodo eliminado con exito.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        }
    }

    async modificaPeriodo() {
        console.log(JSON.stringify(this.periodoJson));
        this.periodoDto = await this.service.modificarPeriodo(this.periodoJson);
        if (this.periodoDto.code === 50) {
            this.messageFechaFinal = true;
            this.textoMensaje = 'Fecha final debe ser mayor a fecha inicial.';
        } else {
            this.modalReference.close();
            this.listadoPagineo(this.pageSize, this.pageIndex);
            swal({
                title: 'Exito!',
                text: 'Periodo actualizado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        }
    }

}
