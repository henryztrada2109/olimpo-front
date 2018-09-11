import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import swal from 'sweetalert2';
import {OcupacionService} from './shared/ocupacion.service';

@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.css'],
  providers: [OcupacionService]
})
export class OcupacionComponent implements OnInit {

    /* Objetos */
    ocupacion = {idOcupacion: 0, descripcion: ''};
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
    ocupacionDto: any;
    data: any;
    dataOcupacion: {};
    /* Variables para formularios */
    tituloModal: string;

    constructor(private readonly service: OcupacionService) { }

    ngOnInit() {
        this.search = null;
        this.listadoPagineo(this.pageSize, this.pageIndex);
    }

    /* Operaciones */
    open() {
        this.sinSeleccionar = false;
        this.iniciarModal();
        this.controlFuncion = 1;
        this.tituloModal = 'Nueva ocupacion';
        this.iniciarErrores();
    }

    iniciarModal() {
        this.controlBoton = true;
        this.controlEliminar = false;
        this.controlCambiar = false;
        this.inputDisabled = false;
        this.ocupacion.descripcion = null;
        this.ocupacion.idOcupacion = null;
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
        if (!this.ocupacion.descripcion) {
            this.messageDescripcion = true;
            this.textoMensaje = 'Campo es requerido';
        } else {
            if (this.controlFuncion === 1) {
                this.ocupacionDto = await this.service.crea(this.ocupacion);
                if (this.ocupacionDto.code === 10) {
                    swal({
                        title: 'Exito!',
                        text: 'Ocupacion ingresada correctamente.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.listadoPagineo(this.pageSize, this.pageIndex - 1);
                    this.closeForm();
                } else {
                    swal({
                        title: 'Error!',
                        text: 'A ocurrido un error al intentar crear la ocupacion',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                this.cambiar();
            }
        }
    }

    modal(ocupacion) {
        this.tituloModal = 'Detalle ocupacion'
        this.iniciarModal();
        this.controlFuncion = 2;
        this.iniciarErrores();
        this.ocupacion.idOcupacion = ocupacion.idOcupacion;
        this.ocupacion.descripcion = ocupacion.descripcion;
        this.controlBoton = false;
        this.controlCambiar = true;
        this.controlEliminar = true;
        this.sinSeleccionar = false;
    }

    /* Funciones ABC Service*/
    async eliminar() {
        this.ocupacionDto = await this.service.eliminar(this.ocupacion.idOcupacion);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.ocupacionDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Ocupacion eliminada correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.ocupacionDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Ocupacion no puede ser eliminada por que se encuentra relacionada.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar la ocupacion',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async cambiar() {
        this.ocupacionDto = await this.service.modificar(this.ocupacion);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.ocupacionDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Ocupacion modificada correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar la ocupacion',
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
            this.dataOcupacion = this.data.content;
            this.length = this.data.totalElements;
        }
    }

    async listadoPagineoFiltro(size, index) {
        this.data = await this.service.listadoPagineoFiltro(size, index, this.search);
        this.dataOcupacion = this.data.content;
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
