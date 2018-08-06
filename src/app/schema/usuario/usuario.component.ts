import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioService} from './usuario.service';
import swal from 'sweetalert2';
import {PageEvent} from '@angular/material';
import {trigger, style, transition, animation, state, animate} from '@angular/animations';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
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
export class UsuarioComponent implements OnInit {

  title = 'Usuarios';
  tituloModal: string;
  modalReference: NgbModalRef;
  focusUsuario: boolean;
  inputDisabled: boolean;
  controlBoton: boolean;
  messageUsuario: boolean;
  messagePass: boolean;
  messageConf: boolean;
  messageText: string;
  usuarioJson = {idRole: 0, idUsuario: 0, pass: '', usuarioApp: '', idTipoMenu: 0, estado: 0};
  confirPass: string;
  botonConfir: boolean;
  messageRole: boolean;
  messageTipo: boolean;
  dataRoles: {};
  dataTipos: {};
  controlFuncion: number;
  usuarioDto: any;
  dataPage: any;
  dataArray: {};
  length: number;
  pageSize = 8;
  pageIndex = 0;
  pageEvent: PageEvent;
  usuarioFiltro: string;
  rolFiltro: number;

  constructor(private readonly modalService: NgbModal,
              private readonly service: UsuarioService) { }

  ngOnInit() {
    this.listadoRoles();
    this.usuarioFiltro = '';
    this.rolFiltro = 0;
    this.listado(this.pageSize, this.pageIndex);
  }

  open(content) {
    this.tituloModal = 'Nuevo Usuario';
    this.limpiarEntidad();
    this.listadoRoles();
    this.listadoTipos();
    this.iniciarModal();
    this.controlFuncion = 1;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  modalEditar(usuario, content) {
    this.tituloModal = 'Modificar Usuario';
    this.limpiarEntidad();
    this.listadoRoles();
    this.listadoTipos();
    this.iniciarModal();
    this.usuarioJson.idRole = usuario.idRole;
    this.usuarioJson.usuarioApp = usuario.usuarioApp;
    this.usuarioJson.pass = usuario.pass;
    this.confirPass = usuario.pass;
    this.usuarioJson.idUsuario = usuario.idUsuario;
    this.usuarioJson.idTipoMenu = usuario.tipoMenu;
    this.usuarioJson.estado = usuario.estado;
    this.usuarioJson.idUsuario = usuario.idUsuario;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  async borrar(usuario) {
    this.usuarioDto = await this.service.eliminar(usuario.idUsuario);
    if (this.usuarioDto.code === 6) {
      swal({
        title: 'Error',
        text: 'Registro se encuentra relacionado.',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    } else {
      swal({
        title: 'Exito',
        text: 'Registro eliminado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
      this.listado(this.pageSize, this.pageIndex);
    }
  }

  modalVisualizar(usuario, content) {
    this.tituloModal = 'Detalle Usuario';
    this.limpiarEntidad();
    this.listadoRoles();
    this.listadoTipos();
    this.iniciarModal();
    this.controlBoton = false;
    this.usuarioJson.idRole = usuario.idRole;
    this.usuarioJson.usuarioApp = usuario.usuarioApp;
    this.usuarioJson.pass = usuario.pass;
    this.confirPass = usuario.pass;
    this.inputDisabled = true;
    this.usuarioJson.idTipoMenu = usuario.tipoMenu;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  limpiarEntidad() {
    this.usuarioJson.pass = '';
    this.usuarioJson.usuarioApp = '';
    this.usuarioJson.idRole = 0;
    this.usuarioJson.idUsuario = 0;
    this.confirPass = '';
  }

  iniciarModal() {
    this.detenerAlertas();
    this.focusUsuario = true;
    this.inputDisabled = false;
    this.controlBoton = true;
    this.botonConfir = true;
    this.usuarioJson.idRole = 0;
    this.usuarioJson.idTipoMenu = 0;
  }

  detenerAlertas() {
    this.messageUsuario = false;
    this.messagePass = false;
    this.messageRole = false;
    this.messageTipo = false;
    this.messageConf = false;
    this.messageText = '';
  }

  confirmaModal() {
    if (this.usuarioJson.usuarioApp == null || this.usuarioJson.usuarioApp === '') {
      this.detenerAlertas();
      this.messageUsuario = true;
      this.messageText = 'Debe ingresar un usuario para identificarse.';
    } else if (this.usuarioJson.pass == null || this.usuarioJson.pass === '') {
      this.detenerAlertas();
      this.messagePass = true;
      this.messageText = 'Debe ingresar una contraseña para el usuario.';
    } else if (this.usuarioJson.pass.length < 4) {
      this.detenerAlertas();
      this.messagePass = true;
      this.messageText = 'Contraseña debe tener al menos 4 carateres.';
    } else if (this.confirPass == null || this.confirPass === '') {
      this.detenerAlertas();
      this.messageConf = true;
      this.messageText = 'Debe confirmar la contraseña del usuario.';
    } else if (this.usuarioJson.pass !== this.confirPass) {
      this.detenerAlertas();
      this.messageConf = true;
      this.messageText = 'Contraseñas no coinciden.';
    } else if (this.usuarioJson.idRole === 0) {
      this.detenerAlertas();
      this.messageRole = true;
      this.messageText = 'Debe seleccionar un rol para el usuario.';
    } else if (this.usuarioJson.idTipoMenu === 0) {
        this.detenerAlertas();
        this.messageTipo = true;
        this.messageText = 'Debe seleccionar un tipo de menu para el usuario.';
    } else {
      this.detenerAlertas();
      if (this.controlFuncion === 1) {
        this.agregarUsuario();
      } else {
        this.editarUsuario();
      }
    }
  }

  closeModal() {
    this.modalReference.close();
  }

  async listado(size, page) {
    if (this.rolFiltro !== 0 && this.usuarioFiltro !== '') {
      this.dataPage = await this.service.listadoFiltroUsuarioRol(size, page, this.usuarioFiltro, this.rolFiltro);
    } else if (this.rolFiltro !== 0 && this.usuarioFiltro === '') {
      this.dataPage = await this.service.listadoFiltroRol(size, page, this.rolFiltro);
    } else if (this.rolFiltro === 0 && this.usuarioFiltro !== '') {
      this.dataPage = await this.service.listadoFiltroUsuario(size, page, this.usuarioFiltro);
    } else {
      this.dataPage = await this.service.listadoUsuario(size, page);
    }
    this.dataArray = this.dataPage.content;
    this.length = this.dataPage.totalElements;
  }

  async listadoRoles() {
    this.dataRoles = await this.service.listadoRoles();
  }

  async agregarUsuario() {
    this.usuarioDto = await this.service.crea(this.usuarioJson, localStorage.getItem('empresa'));
    if (this.usuarioDto.code === 7) {
      this.messageRole = true;
      this.messageText = 'Rol no existe.';
    } else if (this.usuarioDto.code === 15) {
      this.messageUsuario = true;
      this.messageText = 'Usuario ya existe, ingrese uno nuevo.';
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

  async editarUsuario() {
    this.usuarioDto = await this.service.modificar(this.usuarioJson);
    if (this.usuarioDto.code === 7) {
      this.messageRole = true;
      this.messageText = 'Rol no existe.';
    } else if (this.usuarioDto.code === 15) {
      this.messageUsuario = true;
      this.messageText = 'Usuario ya existe, ingrese uno nuevo.';
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

  refrescar($evento) {
    this.listado(this.pageSize, this.pageIndex - 1 );
    return $evento;
  }

  filtrar() {
    this.listado(this.pageSize, this.pageIndex);
  }

  async listadoTipos() {
        this.dataTipos = await this.service.listadoTipos();
  }

}
