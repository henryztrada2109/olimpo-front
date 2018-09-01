import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProfesionService} from './shared/profesion.service';
import swal from 'sweetalert2';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css'],
  providers: [ProfesionService]
})
export class ProfesionComponent implements OnInit {

  /* Objetos */
  profesion = {idProfesion: 0, descripcion: ''};
  /* Variables de pagineo */
  length: number;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent;
  search: string;
  /* Variables de control */
  controlFuncion: number;
  controlBoton: boolean;
  controlEliminar: boolean;
  controlCambiar: boolean;
  sinSeleccionar = true;
  inputDisabled: boolean;
  /* Variables para errores */
  messageDescripcion: boolean;
  textoMensaje: string;
  /* Variables para datos de servicios */
  profesionDto: any;
  data: any;
  dataProfesion: {};
  /* Variables para formularios */
  tituloModal: string;

  constructor(private readonly service: ProfesionService) { }

  ngOnInit() {
      this.search = null;
      this.listadoPagineo(this.pageSize, this.pageIndex);
  }

  /* Operaciones */
  open() {
        this.sinSeleccionar = false;
        this.iniciarModal();
        this.controlFuncion = 1;
        this.tituloModal = 'Nueva profesion';
        this.iniciarErrores();
  }

  iniciarModal() {
        this.controlBoton = true;
        this.controlEliminar = false;
        this.controlCambiar = false;
        this.inputDisabled = false;
        this.profesion.descripcion = null;
        this.profesion.idProfesion = null;
  }

  iniciarErrores() {
        this.messageDescripcion = false;
        this.textoMensaje = null;
  }

  closeForm() {
      this.sinSeleccionar = true;
  }

  /* Funciones ABC */
  async confirmaOperacion() {
        this.iniciarErrores();
        if (!this.profesion.descripcion) {
            this.messageDescripcion = true;
            this.textoMensaje = 'Campo es requerido';
        } else {
            if (this.controlFuncion === 1) {
                this.profesionDto = await this.service.crea(this.profesion);
                if (this.profesionDto.code === 10) {
                    swal({
                        title: 'Exito!',
                        text: 'Profesion ingresada correctamente.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.listadoPagineo(this.pageSize, this.pageIndex - 1);
                    this.closeForm();
                } else {
                    swal({
                        title: 'Error!',
                        text: 'A ocurrido un error al intentar crear la profesion',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                this.cambiar();
            }
        }
  }

  modal(profesion) {
        this.tituloModal = 'Detalle profesion'
        this.iniciarModal();
        this.controlFuncion = 2;
        this.iniciarErrores();
        this.profesion.idProfesion = profesion.idProfesion;
        this.profesion.descripcion = profesion.descripcion;
        this.controlBoton = false;
        this.controlCambiar = true;
        this.controlEliminar = true;
        this.sinSeleccionar = false;
  }

  /* Funciones ABC Service*/
  async eliminar() {
        this.profesionDto = await this.service.eliminar(this.profesion.idProfesion);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.profesionDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Profesion eliminada correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.profesionDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Profesion no puede ser eliminada por que se encuentra relacionada.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar la profesion',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
  }

  async cambiar() {
        this.profesionDto = await this.service.modificar(this.profesion);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.profesionDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Profesion modificada correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar la profesion',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
  }

  /* Funciones de pagineo*/
  async listadoPagineo(size, index) {
        this.data = await this.service.listadoPagineo(size, index);
        this.dataProfesion = this.data.content;
        this.length = this.data.totalElements;
  }

  async listadoPagineoFiltro(size, index) {
      this.data = await this.service.listadoPagineoFiltro(size, index, this.search);
      this.dataProfesion = this.data.content;
      this.length = this.data.totalElements;
  }

  refrescar($evento) {
      if (this.search !== null && this.search !== '') {
          this.listadoPagineoFiltro(this.pageSize, this.pageIndex - 1);
      } else {
          this.listadoPagineo(this.pageSize, this.pageIndex - 1);
      }
        return $evento;
  }

  runSearch() {
      this.listadoPagineoFiltro(this.pageSize, this.pageIndex - 1);
  }

  evaluaSearch($event) {
      const charCode = ($event.which) ? $event.which : $event.keyCode;
      if (charCode === 13) {
          this.applyFilter();
      }
  }

  async applyFilter() {
      if (this.search !== null && this.search !== '') {
          this.pageIndex = 1;
          this.listadoPagineoFiltro(this.pageSize, this.pageIndex - 1);
      } else {
          this.listadoPagineo(this.pageSize, this.pageIndex - 1);
      }
  }

}
