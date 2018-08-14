import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TipoMenuService} from './tipo-menu.service';
import {PageEvent} from '@angular/material';
import swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tipo-menu',
  templateUrl: './tipo-menu.component.html',
  styleUrls: ['./tipo-menu.component.css'],
  providers: [TipoMenuService],
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
export class TipoMenuComponent implements OnInit {

  length: number;
  pageSize = 5;
  pageIndex = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  /*Variables*/
  modalReference: NgbModalRef;
  title = 'Tipos de Menus';
  data: any;
  tituloModal = '';
  messageCodigo = false;
  messageCodigo2 = false;
  messageNombre = false;
  controlFuncion: number;
  focusCodigo: boolean;
  inputDisabled: boolean;
  datax: {};
  /*
  * 1=Alta
  * 2=Editar
  * */
  controlBoton: boolean;
  tipoMenu = {idTipoMenu: 0, codigo: 0, descripcion: ''};
  tipoMenuDTO: any;
  constructor(private readonly modalService: NgbModal,
              private readonly service: TipoMenuService) { }

  ngOnInit(): void {
    this.listado(this.pageSize, this.pageIndex);
  }

  /*Modal*/
  open(content) {
    this.controlBoton = true;
    this.controlFuncion = 1;
    this.clearNota();
    this.tituloModal = 'Nuevo Tipo';
    this.modalReference = this.modalService.open(content, {centered: true});
    this.focusCodigo = true;
  }

  clearNota() {
    this.tipoMenu.idTipoMenu = null;
    this.tipoMenu.codigo = null;
    this.tipoMenu.descripcion = null;
    this.detenerAlertas();
    this.inputDisabled = false;
  }

  detenerAlertas() {
    this.messageCodigo = false;
    this.messageCodigo2 = false;
    this.messageNombre = false;
  }

  closeModal() {
    this.modalReference.close();
  }

  confirmaModal() {
    if (this.tipoMenu.codigo < 1) {
      this.messageCodigo = true;
    } else if (this.tipoMenu.descripcion == null || this.tipoMenu.descripcion === '') {
      this.detenerAlertas();
      this.messageNombre = true;
    } else {
      this.detenerAlertas();
      if (this.controlFuncion === 1) {
        this.agregar();
      } else {
        this.modificar();
      }
    }
  }

  modalEditar(tipo, content) {
    this.controlBoton = true;
    this.controlFuncion = 2;
    this.clearNota();
    this.tituloModal = 'Editar Tipo';
    this.tipoMenu.idTipoMenu = tipo.idTipoMenu;
    this.tipoMenu.codigo = tipo.codigo;
    this.tipoMenu.descripcion = tipo.descripcion;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  modalVisualizar(tipo, content) {
    this.controlBoton = false;
    this.clearNota();
    this.inputDisabled = true;
    this.tituloModal = 'Visualizar Moneda';
    this.tipoMenu.idTipoMenu = tipo.idMoneda;
    this.tipoMenu.codigo = tipo.codigo;
    this.tipoMenu.descripcion = tipo.descripcion;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  /*Fin Modal*/

  /*Metodos CRUD*/
  async listado(size, page) {
    this.data = await this.service.listadoTipo(size, page);
    this.datax = this.data.content;
    this.length = this.data.totalElements;
  }

  async agregar() {
    this.tipoMenuDTO = await this.service.crea(this.tipoMenu);
    if (this.tipoMenuDTO.code === 4) {
      this.messageCodigo2 = true;
    } else {
      this.listado(this.pageSize, this.pageIndex);
      this.modalReference.close();
      swal({
        title: 'Exito!',
        text: 'Registro ingresado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async modificar() {
    this.tipoMenuDTO = await this.service.modificar(this.tipoMenu);
    if (this.tipoMenuDTO.code === 4) {
      this.messageCodigo2 = true;
    } else {
      this.listado(this.pageSize, this.pageIndex);
      this.modalReference.close();
      swal({
        title: 'Exito!',
        text: 'Registro modificado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async borrar(tipo) {
    this.tipoMenuDTO = await this.service.eliminar(tipo.idTipoMenu);
    if (this.tipoMenuDTO.code === 6) {
      swal({
        title: 'Error',
        text: 'Registro se encuentra relacionado.',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    } else {
      this.listado(this.pageSize, this.pageIndex);
      swal({
        title: 'Exito',
        text: 'Registro eliminado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  refrescar($evento) {
    this.listado(this.pageSize, this.pageIndex - 1);
    return $evento;
  }

}
