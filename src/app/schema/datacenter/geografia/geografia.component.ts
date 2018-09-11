import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import swal from 'sweetalert2';
import {GeografiaService} from './shared/geografia.service';
import {FlextHandler} from 'flext';

@Component({
  selector: 'app-geografia',
  templateUrl: './geografia.component.html',
  styleUrls: ['./geografia.component.css'],
  providers: [GeografiaService]
})
export class GeografiaComponent implements OnInit {

    /* Objetos */
    pais = {idPais: 0, descripcion: '', abreviatura: '', nacionalidad: ''};
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
    messageNacionalidad: boolean;
    textoMensaje: string;
    /* Variables para datos de servicios */
    paisDto: any;
    data: any;
    dataPais: {};
    /* Variables para formularios */
    tituloModal: string;
    /* Control de pantalla */
    nivel: number;
    /* Objetos */
    departamento = {idDepartamento: 0, descripcion: '', idPais: 0};
    /* Variables de pagineo */
    length2: number;
    pageSize2 = 5;
    pageIndex2 = 0;
    pageEvent2: PageEvent;
    search2: string;
    /* Variables de control */
    controlFuncion2: number;
    controlBoton2: boolean;
    controlEliminar2: boolean;
    controlCambiar2: boolean;
    sinSeleccionar2 = true;
    inputDisabled2: boolean;
    /* Variables para errores */
    messageDescripcion2: boolean;
    textoMensaje2: string;
    /* Variables para datos de servicios */
    departamentoDto: any;
    data2: any;
    dataDepartamento: {};
    /* Variables para formularios */
    tituloModal2: string;

    constructor(private readonly service: GeografiaService) { }

    @FlextHandler()
    async ngOnInit() {
        this.nivel = 1;
        this.search = null;
        await this.listadoPagineo(this.pageSize, this.pageIndex);
    }

    /* Operaciones */
    open() {
        this.sinSeleccionar = false;
        this.iniciarModal();
        this.controlFuncion = 1;
        this.tituloModal = 'Nuevo Pais';
        this.iniciarErrores();
    }

    iniciarModal() {
        this.controlBoton = true;
        this.controlEliminar = false;
        this.controlCambiar = false;
        this.inputDisabled = false;
        this.pais.descripcion = null;
        this.pais.idPais = null;
        this.pais.nacionalidad = null;
        this.pais.abreviatura = null;
    }

    iniciarErrores() {
        this.messageDescripcion = false;
        this.messageNacionalidad = false;
        this.messageAbreviatura = false;
        this.textoMensaje = null;
    }

    closeForm() {
        this.sinSeleccionar = true;
    }

    /* Funciones ABC */
    async confirmaOperacion() {
        this.iniciarErrores();
        if (!this.pais.descripcion) {
            this.messageDescripcion = true;
            this.textoMensaje = 'Campo es requerido';
        } else if (!this.pais.abreviatura) {
            this.messageAbreviatura = true;
            this.textoMensaje = 'Campo es requerido';
        } else if (!this.pais.nacionalidad) {
            this.messageNacionalidad = true;
            this.textoMensaje = 'Campo es requerido';
        } else {
            if (this.controlFuncion === 1) {
                this.paisDto = await this.service.crea(this.pais);
                if (this.paisDto.code === 10) {
                    swal({
                        title: 'Exito!',
                        text: 'Pais ingresado correctamente.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.listadoPagineo(this.pageSize, this.pageIndex - 1);
                    this.closeForm();
                } else {
                    swal({
                        title: 'Error!',
                        text: 'A ocurrido un error al intentar crear el pais',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                this.cambiar();
            }
        }
    }

    modal(pais) {
        this.tituloModal = 'Detalle pais';
        this.iniciarModal();
        this.controlFuncion = 2;
        this.iniciarErrores();
        this.pais.idPais = pais.idPais;
        this.pais.descripcion = pais.descripcion;
        this.pais.nacionalidad = pais.nacionalidad;
        this.pais.abreviatura = pais.abreviatura;
        this.controlBoton = false;
        this.controlCambiar = true;
        this.controlEliminar = true;
        this.sinSeleccionar = false;
    }

    /* Funciones ABC Service*/
    async eliminar() {
        this.paisDto = await this.service.eliminar(this.pais.idPais);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.paisDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Pais eliminado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.paisDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Pais no puede ser eliminado por que se encuentra relacionado.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el pais',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async cambiar() {
        this.paisDto = await this.service.modificar(this.pais);
        this.closeForm();
        this.listadoPagineo(this.pageSize, this.pageIndex - 1);
        if (this.paisDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Pais modificado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el pais',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    /* Funciones de pagineo*/
    async listadoPagineo(size, index) {
        this.data = await this.service.listadoPagineo(size, index);
        this.dataPais = this.data.content;
        this.length = this.data.totalElements;
    }

    async listadoPagineoFiltro(size, index) {
        this.data = await this.service.listadoPagineoFiltro(size, index, this.search);
        this.dataPais = this.data.content;
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

    async segundoNivel() {
        this.nivel = 2;
        this.search2 = null;
        await this.listadoPagineo2(this.pageSize2, this.pageIndex2);
    }

    /* Segundo Nivel */
    /* Operaciones */
    open2() {
        this.sinSeleccionar2 = false;
        this.iniciarModal2();
        this.controlFuncion2 = 1;
        this.tituloModal2 = 'Nuevo departamento';
        this.iniciarErrores2();
    }

    iniciarModal2() {
        this.controlBoton2 = true;
        this.controlEliminar2 = false;
        this.controlCambiar2 = false;
        this.inputDisabled2 = false;
        this.departamento.descripcion = null;
        this.departamento.idPais = null;
        this.departamento.idDepartamento = null;
    }

    iniciarErrores2() {
        this.messageDescripcion2 = false;
        this.textoMensaje2 = null;
    }

    closeForm2() {
        this.sinSeleccionar2 = true;
    }

    /* Funciones ABC */
    async confirmaOperacion2() {
        this.iniciarErrores2();
        if (!this.departamento.descripcion) {
            this.messageDescripcion2 = true;
            this.textoMensaje2 = 'Campo es requerido';
        } else {
            if (this.controlFuncion2 === 1) {
                this.departamentoDto = await this.service.creaDepartamento(this.departamento);
                if (this.departamentoDto.code === 10) {
                    swal({
                        title: 'Exito!',
                        text: 'Departamento ingresado correctamente.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.listadoPagineo2(this.pageSize, this.pageIndex - 1);
                    this.closeForm2();
                } else {
                    swal({
                        title: 'Error!',
                        text: 'A ocurrido un error al intentar crear el departamento',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                this.cambiarDepartamento();
            }
        }
    }

    modalDepartamento(departamento) {
        this.tituloModal2 = 'Detalle departamento';
        this.iniciarModal2();
        this.controlFuncion2 = 2;
        this.iniciarErrores2();
        this.departamento.idPais = departamento.idPais;
        this.departamento.descripcion = departamento.descripcion;
        this.departamento.idDepartamento = departamento.idDepartamento;
        this.controlBoton2 = false;
        this.controlCambiar2 = true;
        this.controlEliminar2 = true;
        this.sinSeleccionar2 = false;
    }

    /* Funciones ABC Service*/
    async eliminarDepartamento() {
        this.departamentoDto = await this.service.eliminarDepartamento(this.pais.idPais);
        this.closeForm2();
        this.listadoPagineo2(this.pageSize2, this.pageIndex2 - 1);
        if (this.departamentoDto.code === 12) {
            swal({
                title: 'Exito!',
                text: 'Departamento eliminado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else if (this.departamentoDto.code === 6) {
            swal({
                title: 'Error!',
                text: 'Departamento no puede ser eliminado por que se encuentra relacionado.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el pais',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async cambiarDepartamento() {
        this.departamentoDto = await this.service.modificarDepartamento(this.pais);
        this.closeForm2();
        this.listadoPagineo2(this.pageSize2, this.pageIndex2 - 1);
        if (this.departamentoDto.code === 11) {
            swal({
                title: 'Exito!',
                text: 'Departamento modificado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'A ocurrido un error al intentar eliminar el departamento',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    /* Funciones de pagineo Segundo Nivel*/
    async listadoPagineo2(size, index) {
        this.data2 = await this.service.listadoPagineoDepartamento(size, index, this.pais.idPais);
        this.dataDepartamento = this.data2.content;
        this.length2 = this.data2.totalElements;
    }

    async listadoPagineoFiltro2(size, index) {
        this.data2 = await this.service.listadoPagineoFiltroDepartamento(size, index, this.search2, this.pais.idPais);
        this.dataDepartamento = this.data2.content;
        this.length2 = this.data2.totalElements;
    }

    refrescar2($evento) {
        if (this.search2 !== null && this.search2 !== '') {
            this.listadoPagineoFiltro2(this.pageSize2, this.pageIndex2 - 1);
        } else {
            this.listadoPagineo2(this.pageSize2, this.pageIndex2 - 1);
        }
        return $evento;
    }

    runSearch2() {
        this.listadoPagineoFiltro2(this.pageSize2, this.pageIndex2 - 1);
    }

    evaluaSearch2($event) {
        const charCode = ($event.which) ? $event.which : $event.keyCode;
        if (charCode === 13) {
            this.applyFilter2();
        }
    }

    async applyFilter2() {
        if (this.search2 !== null && this.search2 !== '') {
            this.pageIndex2 = 1;
            this.listadoPagineoFiltro2(this.pageSize2, this.pageIndex2 - 1);
        } else {
            this.listadoPagineo2(this.pageSize2, this.pageIndex2 - 1);
        }
    }

}
