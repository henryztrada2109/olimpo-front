import { Component, OnInit } from '@angular/core';
import {TipoIdentificacionService} from './shared/tipo-identificacion.service';
import {PageEvent} from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-identificacion',
  templateUrl: './tipo-identificacion.component.html',
  styleUrls: ['./tipo-identificacion.component.css'],
  providers: [TipoIdentificacionService]
})
export class TipoIdentificacionComponent implements OnInit {

    /* Objetos */
    tipoIdentificacion = {idTipo: 0, descripcion: '', abreviatura: '', mascara: ''};
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
    messageAbreviatura: boolean;
    messageMascara: boolean;
    textoMensaje: string;
    /* Variables para datos de servicios */
    tipoIdentificacionDto: any;
    data: any;
    dataTipos: {};
    /* Variables para formularios */
    tituloModal: string;

    constructor(private readonly service: TipoIdentificacionService) { }

    ngOnInit() {
        this.search = null;
        this.listadoPagineo(this.pageSize, this.pageIndex);
    }

    /* Operaciones */
    open() {
        this.sinSeleccionar = false;
        this.iniciarModal();
        this.controlFuncion = 1;
        this.tituloModal = 'Nuevo Tipo';
        this.iniciarErrores();
    }

    iniciarModal() {
        this.controlBoton = true;
        this.controlEliminar = false;
        this.controlCambiar = false;
        this.inputDisabled = false;
        this.tipoIdentificacion.descripcion = null;
        this.tipoIdentificacion.idTipo = null;
        this.tipoIdentificacion.abreviatura = null;
        this.tipoIdentificacion.mascara =null;
    }

    iniciarErrores() {
        this.messageDescripcion = false;
        this.messageAbreviatura = false;
        this.messageMascara = false;
        this.textoMensaje = null;
    }

    closeForm() {
        this.sinSeleccionar = true;
    }

    /* Funciones ABC */
    async confirmaOperacion() {
        this.iniciarErrores();
        if (!this.tipoIdentificacion.descripcion) {
            this.messageDescripcion = true;
            this.textoMensaje = 'Campo es requerido';
        } else {
            if (this.controlFuncion === 1) {
                this.tipoIdentificacionDto = await this.service.crea(this.tipoIdentificacion);
                if (this.tipoIdentificacionDto.code === 10) {
                    swal({
                        title: 'Exito!',
                        text: 'Tipo ingresado correctamente.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.listadoPagineo(this.pageSize, this.pageIndex - 1);
                    this.closeForm();
                } else {
                    swal({
                        title: 'Error!',
                        text: 'A ocurrido un error al intentar crear el tipo.',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                this.cambiar();
            }
        }
    }

    modal(tipo) {
        this.tituloModal = 'Detalle Tipo';
        this.iniciarModal();
        this.controlFuncion = 2;
        this.iniciarErrores();
        this.tipoIdentificacion.idTipo = tipo.idTipo;
        this.tipoIdentificacion.descripcion = tipo.descripcion;
        this.tipoIdentificacion.abreviatura = tipo.abreviatura;
        this.tipoIdentificacion.mascara = tipo.mascara;
        this.controlBoton = false;
        this.controlCambiar = true;
        this.controlEliminar = true;
        this.sinSeleccionar = false;
    }

    /* Funciones ABC Service*/
    async eliminar() {
        this.tipoIdentificacionDto = await this.service.eliminar(this.tipoIdentificacion.idTipo);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.tipoIdentificacionDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Tipo eliminado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.tipoIdentificacionDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Tipo no puede ser eliminado por que se encuentra relacionado.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el tipo.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async cambiar() {
        this.tipoIdentificacionDto = await this.service.modificar(this.tipoIdentificacion);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.tipoIdentificacionDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Tipo modificado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar modificar el tipo',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    /* Funciones de pagineo*/
    async listadoPagineo(size, index) {
        if (this.search) {
            this.listadoPagineoFiltro(size, index);
        } else {
            this.data = await this.service.listadoPagineo(size, index);
            this.dataTipos = this.data.content;
            this.length = this.data.totalElements;
        }
    }

    async listadoPagineoFiltro(size, index) {
        this.data = await this.service.listadoPagineoFiltro(size, index, this.search);
        this.dataTipos = this.data.content;
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
