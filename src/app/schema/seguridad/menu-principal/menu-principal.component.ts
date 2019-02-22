import { Component, OnInit } from '@angular/core';
import {MenuPrincipalService} from './menu-principal.service';
import {NgbModal, NgbModalRef, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
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
export class MenuPrincipalComponent implements OnInit {

  title = 'Menus Principales';
  dataTipo: {};
  disabledContent: boolean;
  tipoSeleccionado: number;
  tituloModal: string;
  modalReference: NgbModalRef;
  controlBoton: boolean;
  menuPrincipalJson = {idMenuPrincipal: 0, descripcion: '', ejecuta: 0, idIcono: 0, idOpciones: 0, idTipoMenu: 0, orden: 0};
  inputDisabled: boolean;
  focusOrden: boolean;
  textoMensaje: string;
  claseIcono: string;
  radio: boolean;
  messageOrden: boolean;
  messageDescripcion: boolean;
  messageOpcion: boolean;
  messageIcono: boolean;
  tipoFuncion: number;
  dataIconos: {};
  icono: any;
  dataOpciones: {};
  menuPrincipalDto: any;
  dataMenuPrincipal: {};
  messageSubOrden: boolean;
  messageSubDescripcion: boolean;
  messageSubOpcion: boolean;
  menuSecundarioJson = {idMenuSecundario: 0, descripcion: '', idOpciones: 0, orden: 0, idMenuPrincipal: 0};
  menuSecundarioDto: any;
  dataMenuSecundario: {};

  constructor(private readonly service: MenuPrincipalService,
              private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.listadoTipos();
    this.tipoSeleccionado = 0;
    this.disabledContent = false;
  }

  async listadoTipos() {
    this.dataTipo = await this.service.listadoTipo();
  }

  onChange() {
    if (this.tipoSeleccionado > 0) {
      this.disabledContent = true;
    } else {
      this.disabledContent = false;
    }
    this.listadoMenuPrincipal();
  }

  async listadoMenuPrincipal() {
    this.dataMenuPrincipal = await this.service.listadoMenuPrincipal(this.tipoSeleccionado);
  }

  open(content) {
    this.tipoFuncion = 1;
    this.focusOrden = true;
    this.inputDisabled = false;
    this.controlBoton = true;
    this.tituloModal = 'Nuevo';
    this.detenerAlertas();
    this.iniciarModal();
    this.clearMenuPrincipal();
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  iniciarModal() {
    this.radio = false;
    this.claseIcono = 'fa-eercast';
    this.listadoIconos();
    this.listadoOpciones();
  }

  detenerAlertas() {
    this.messageOrden = false;
    this.messageDescripcion = false;
    this.messageOpcion = false;
    this.messageIcono = false;
    this.textoMensaje = null;
  }

  clearMenuPrincipal() {
    this.menuPrincipalJson.descripcion = null;
    this.menuPrincipalJson.ejecuta = null;
    this.menuPrincipalJson.idIcono = 0;
    this.menuPrincipalJson.idOpciones = 0;
    this.menuPrincipalJson.idTipoMenu = null;
    this.menuPrincipalJson.orden = null;
    this.menuPrincipalJson.idMenuPrincipal = null;
  }

  closeModal() {
    this.modalReference.close();
  }

  confirmaModal() {
    if (this.menuPrincipalJson.orden < 1) {
      this.detenerAlertas();
      this.messageOrden = true;
      this.textoMensaje = 'Debe ingresar un numero para colocar la opcion de menu.';
    } else if (this.menuPrincipalJson.descripcion == null || this.menuPrincipalJson.descripcion === '') {
      this.detenerAlertas();
      this.messageDescripcion = true;
      this.textoMensaje = 'Debe ingresar una descripcion.';
    } else if (this.menuPrincipalJson.idIcono === 0) {
      this.detenerAlertas();
      this.messageIcono = true;
      this.textoMensaje = 'Debe seleccionar un icono para la opcion.';
    } else if (this.menuPrincipalJson.idOpciones === 0 && this.radio === true) {
      this.detenerAlertas();
      this.messageOpcion = true;
      this.textoMensaje = 'Debe seleccionar la opcion a ejecutar.';
    } else {
      this.detenerAlertas();
      if (this.tipoFuncion === 1) {
        this.agregarMenuPrincipal();
      } else {
        this.modificarMenuPrincipal();
      }
    }
  }

  async agregarMenuPrincipal() {
    if (this.radio === true) {
      this.menuPrincipalJson.ejecuta = 1;
    } else {
      this.menuPrincipalJson.ejecuta = 0;
      this.menuPrincipalJson.idOpciones = 1;
    }
    this.menuPrincipalJson.idTipoMenu = this.tipoSeleccionado;
    this.menuPrincipalDto = await this.service.crea(this.menuPrincipalJson);
    if (this.menuPrincipalDto.code === 7) {
      swal({
        title: 'Error!',
        text: 'Tipo de Menu no existe',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    } else if (this.menuPrincipalDto.code === 8) {
      this.detenerAlertas();
      this.messageOpcion = true;
      this.textoMensaje = 'Opcion de menu no existe.';
    } else if (this.menuPrincipalDto.code === 9) {
      this.detenerAlertas();
      this.messageIcono = true;
      this.textoMensaje = 'Icono no existe.';
    } else {
      this.modalReference.close();
      this.onChange();
      swal({
        title: 'Exito!',
        text: 'Registro ingresado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async modificarMenuPrincipal() {
    if (this.radio === true) {
      this.menuPrincipalJson.ejecuta = 1;
    } else {
      this.menuPrincipalJson.ejecuta = 0;
    }
    this.menuPrincipalDto = await this.service.modificarMenuPrincipal(this.menuPrincipalJson);
    if (this.menuPrincipalDto.code === 7) {
      swal({
        title: 'Error!',
        text: 'Tipo de Menu no existe',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    } else if (this.menuPrincipalDto.code === 8) {
      this.detenerAlertas();
      this.messageOpcion = true;
      this.textoMensaje = 'Opcion de menu no existe.';
    } else if (this.menuPrincipalDto.code === 9) {
      this.detenerAlertas();
      this.messageIcono = true;
      this.textoMensaje = 'Icono no existe.';
    } else {
      this.modalReference.close();
      this.onChange();
      swal({
        title: 'Exito!',
        text: 'Registro modificado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async listadoIconos() {
    this.dataIconos = await this.service.listadoIconos();
  }

  async iconoChange() {
    if (this.menuPrincipalJson.idIcono === 0) {
      this.claseIcono = 'fa-eercast';
    } else {
      this.detenerAlertas();
      this.icono = await this.service.getIcono(this.menuPrincipalJson.idIcono);
      this.claseIcono = this.icono.clase;
    }
  }

  async listadoOpciones() {
    this.dataOpciones = await this.service.listadoOpciones();
  }

  async modalEditarMenuPrincipal(menu, content) {
    this.tipoFuncion = 2;
    this.focusOrden = true;
    this.inputDisabled = false;
    this.controlBoton = true;
    this.tituloModal = 'Editar';
    this.detenerAlertas();
    this.iniciarModal();
    this.clearMenuPrincipal();
    this.menuPrincipalJson.idMenuPrincipal = menu.idMenuPrincipal;
    this.menuPrincipalJson.idTipoMenu = menu.idTipoMenu;
    this.menuPrincipalJson.orden = menu.orden;
    this.menuPrincipalJson.descripcion = menu.descripcion;
    this.menuPrincipalJson.idIcono = menu.idIcono
    this.icono = await this.service.getIcono(this.menuPrincipalJson.idIcono);
    this.claseIcono = this.icono.clase;
    this.menuPrincipalJson.ejecuta = menu.ejecuta;
    if (this.menuPrincipalJson.ejecuta === 1) {
      this.radio = true;
    } else {
      this.radio = false;
    }
    this.menuPrincipalJson.idOpciones = menu.idOpciones;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  async modalVisualizarMenuPrincipal(menu, content) {
    this.tipoFuncion = 0;
    this.inputDisabled = true;
    this.controlBoton = false;
    this.tituloModal = 'Detalle';
    this.detenerAlertas();
    this.iniciarModal();
    this.clearMenuPrincipal();
    this.menuPrincipalJson.idMenuPrincipal = menu.idMenuPrincipal;
    this.menuPrincipalJson.idTipoMenu = menu.idTipoMenu;
    this.menuPrincipalJson.orden = menu.orden;
    this.menuPrincipalJson.descripcion = menu.descripcion;
    this.menuPrincipalJson.idIcono = menu.idIcono
    this.icono = await this.service.getIcono(this.menuPrincipalJson.idIcono);
    this.claseIcono = this.icono.clase;
    this.menuPrincipalJson.ejecuta = menu.ejecuta;
    if (this.menuPrincipalJson.ejecuta === 1) {
      this.radio = true;
    } else {
      this.radio = false;
    }
    this.menuPrincipalJson.idOpciones = menu.idOpciones;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  async borrarMenuPrincipal(menu) {
    swal({
      title: 'Realmente decea eliminar este menu?',
      text: 'Se eliminaran todos los sub-menus si acepta!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.eliminarMenuPrincipal(menu);
      }
    });
  }

  async eliminarMenuPrincipal(menu) {
    this.menuPrincipalDto = await this.service.eliminarMenuPrincipal(menu.idMenuPrincipal);
    if (this.menuPrincipalDto.code === 6) {
      swal({
        title: 'Error',
        text: 'Registro se encuentra relacionado.',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    } else {
      this.onChange();
      swal(
        'Eliminado!',
        'Registro eliminado correctamente.',
        'success'
      );
    }
  }

  closeSubModal() {
    this.modalReference.close();
  }

  openSubModal(modalSub, id) {
    this.tipoFuncion = 1;
    this.focusOrden = true;
    this.inputDisabled = false;
    this.controlBoton = true;
    this.tituloModal = 'Nuevo Sub-Menu';
    this.detenerAlertasSubModal();
    this.iniciarSubModal();
    this.clearSubMenu();
    this.menuSecundarioJson.idMenuPrincipal = id;
    this.modalReference = this.modalService.open(modalSub, {centered: true});
  }

  detenerAlertasSubModal() {
    this.messageSubDescripcion = false;
    this.messageSubOpcion = false;
    this.messageSubOrden = false;
    this.textoMensaje = '';
  }

  iniciarSubModal() {
    this.listadoOpciones();
  }

  clearSubMenu() {
    this.menuSecundarioJson.descripcion = null;
    this.menuSecundarioJson.idOpciones = 0;
    this.menuSecundarioJson.orden = null;
    this.menuSecundarioJson.idMenuSecundario = null;
  }

  confirmaSubModal() {
    if (this.menuSecundarioJson.orden < 1) {
      this.detenerAlertasSubModal();
      this.messageSubOrden = true;
      this.textoMensaje = 'Debe ingresar un numero para colocar la opcion de menu.';
    } else if (this.menuSecundarioJson.descripcion == null || this.menuSecundarioJson.descripcion === '') {
      this.detenerAlertasSubModal();
      this.messageSubDescripcion = true;
      this.textoMensaje = 'Debe ingresar una descripcion.';
    } else if (this.menuSecundarioJson.idOpciones === 0) {
      this.detenerAlertasSubModal();
      this.messageSubOpcion = true;
      this.textoMensaje = 'Debe seleccionar la opcion a ejecutar.';
    } else {
      this.detenerAlertasSubModal();
      if (this.tipoFuncion === 1) {
        this.agregarSubMenu();
      } else {
        this.modificarSubMenu();
      }
    }
  }

  async agregarSubMenu() {
    this.menuSecundarioDto = await this.service.creaMenuSecundario(this.menuSecundarioJson);
    if (this.menuSecundarioDto.code === 7) {
      swal({
        title: 'Error!',
        text: 'Menu Principal no existe',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    } else if (this.menuSecundarioDto.code === 8) {
      this.detenerAlertasSubModal();
      this.messageSubOpcion = true;
      this.textoMensaje = 'Opcion de menu no existe.';
    } else {
      this.modalReference.close();
      this.listadoMenuSecundario(this.menuSecundarioJson.idMenuPrincipal);
      swal({
        title: 'Exito!',
        text: 'Registro creado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  modalVisualizarMenuSecundario(secundario, modalSub) {
    this.tipoFuncion = 0;
    this.inputDisabled = true;
    this.controlBoton = false;
    this.tituloModal = 'Detalle';
    this.detenerAlertasSubModal();
    this.iniciarSubModal();
    this.clearSubMenu();
    this.menuSecundarioJson.idMenuPrincipal = secundario.idMenuPrincipal;
    this.menuSecundarioJson.idMenuSecundario = secundario.idMenuSecundario;
    this.menuSecundarioJson.descripcion = secundario.descripcion;
    this.menuSecundarioJson.idOpciones = secundario.idOpciones;
    this.menuSecundarioJson.orden = secundario.orden;
    this.modalReference = this.modalService.open(modalSub, {centered: true});
  }

  async borrarMenuSecundario(secundario) {
    this.menuSecundarioDto = await this.service.eliminarMenuSecundario(secundario.idMenuSecundario);
    if (this.menuSecundarioDto.code === 6) {
      swal({
        title: 'Error',
        text: 'Registro se encuentra relacionado.',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    } else {
      this.listadoMenuSecundario(secundario.idMenuPrincipal);
      swal(
        'Eliminado!',
        'Registro eliminado correctamente.',
        'success'
      );
    }
  }

  modalModificarMenuSecundario(secundario, modalSub) {
    this.tipoFuncion = 2;
    this.inputDisabled = false;
    this.controlBoton = true;
    this.tituloModal = 'Modificar Sub-Menu';
    this.detenerAlertasSubModal();
    this.iniciarSubModal();
    this.clearSubMenu();
    this.menuSecundarioJson.idMenuPrincipal = secundario.idMenuPrincipal;
    this.menuSecundarioJson.idMenuSecundario = secundario.idMenuSecundario;
    this.menuSecundarioJson.descripcion = secundario.descripcion;
    this.menuSecundarioJson.idOpciones = secundario.idOpciones;
    this.menuSecundarioJson.orden = secundario.orden;
    this.modalReference = this.modalService.open(modalSub, {centered: true});
  }

  async modificarSubMenu() {
    this.menuSecundarioDto = await this.service.modificarMenuSecundario(this.menuSecundarioJson);
    if (this.menuSecundarioDto.code === 7) {
      swal({
        title: 'Error!',
        text: 'Menu Principal no existe',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    } else if (this.menuSecundarioDto.code === 8) {
      this.detenerAlertasSubModal();
      this.messageSubOpcion = true;
      this.textoMensaje = 'Opcion de menu no existe.';
    } else {
      this.modalReference.close();
      this.listadoMenuSecundario(this.menuSecundarioJson.idMenuPrincipal);
      swal({
        title: 'Exito!',
        text: 'Registro creado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  listaTablas($event: NgbPanelChangeEvent) {
    this.listadoMenuSecundario($event.panelId);
  }

  async listadoMenuSecundario(id) {
    this.dataMenuSecundario = await this.service.listadoMenuSecundario(id);
  }

}
