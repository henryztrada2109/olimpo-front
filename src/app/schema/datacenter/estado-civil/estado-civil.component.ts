import { Component, OnInit } from '@angular/core';
import {EstadoCivilService} from './shared/estado-civil.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PageEvent} from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css'],
  providers: [EstadoCivilService]
})
export class EstadoCivilComponent implements OnInit {

    tituloModal: string;
    controlFuncion: number;
    modalReference: NgbModalRef;
    estadoCivil = {idEstado: 0, descripcion: ''};
    messageDescripcion: boolean;
    textoMensaje: string;
    controlBoton: boolean;
    inputDisabled: boolean;
    estadoCivilDto: any;
    length: number;
    pageSize = 10;
    pageIndex = 0;
    pageEvent: PageEvent;
    data: any;
    dataEstadoCivil: {};
    controlEliminar: boolean;
    controlCambiar: boolean;

    constructor(private readonly modalService: NgbModal,
                private readonly service: EstadoCivilService) { }

    ngOnInit() {
        this.listadoPagineo(this.pageSize, this.pageIndex);
    }

    open(content) {
        this.tituloModal = 'Nuevo estado';
        this.iniciarModal();
        this.controlFuncion = 1;
        this.iniciarErrores();
        this.modalReference = this.modalService.open(content, {centered: true});
    }

    iniciarModal() {
        this.controlBoton = true;
        this.controlEliminar = false;
        this.controlCambiar = false;
        this.inputDisabled = false;
        this.estadoCivil.descripcion = null;
        this.estadoCivil.idEstado = null;
    }

    iniciarErrores() {
        this.messageDescripcion = false;
        this.textoMensaje = null;
    }

    closeModal() {
        this.modalReference.close();
    }

    async confirmaModal() {
        this.iniciarErrores();
        if (this.estadoCivil.descripcion === null || this.estadoCivil.descripcion === '') {
            this.messageDescripcion = true;
            this.textoMensaje = 'Debe ingresar una descripcion para el estado';
        } else if (this.controlFuncion === 1) {
            this.estadoCivilDto = await this.service.crea(this.estadoCivil);
            this.closeModal();
            this.listadoPagineo(this.pageSize, this.pageIndex);
            if (this.estadoCivilDto.code === 10) {
                swal({
                    title: 'Exito!',
                    text: 'Estado ingresado correctamente.',
                    type: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                swal({
                    title: 'Error!',
                    text: 'A ocurrido un error al intentar crear el estado',
                    type: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }

    async listadoPagineo(size, index) {
        this.data = await this.service.listadoPagineo(size, index);
        this.dataEstadoCivil = this.data.content;
        this.length = this.data.totalElements;
    }

    refrescar($evento) {
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        return $evento;
    }

    modal(estadoCivil, content) {
        this.tituloModal = 'Detalle estado';
        this.iniciarModal();
        this.controlFuncion = 2;
        this.iniciarErrores();
        this.estadoCivil.idEstado = estadoCivil.idEstado;
        this.estadoCivil.descripcion = estadoCivil.descripcion;
        this.controlBoton = false;
        this.controlCambiar = true;
        this.controlEliminar = true;
        this.modalReference = this.modalService.open(content, {centered: true});
    }

    async eliminar() {
        this.estadoCivilDto = await this.service.eliminar(this.estadoCivil.idEstado);
        this.closeModal();
        this.listadoPagineo(this.pageSize, this.pageIndex);
        if (this.estadoCivilDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Estado eliminado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.estadoCivilDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Estado no puede ser eliminado por que se encuentra relacionada.',
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
        this.estadoCivilDto = await this.service.modificar(this.estadoCivil);
        this.closeModal();
        this.listadoPagineo(this.pageSize, this.pageIndex);
        if (this.estadoCivilDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Estado modificado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el estado',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

}
