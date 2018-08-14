import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from './role.service';
import swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService],
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
export class RoleComponent implements OnInit {

  /*Variables*/
  length: number;
  pageSize = 5;
  pageIndex = 0;

  // MatPaginator Output
  modalReference: NgbModalRef;
  title = 'Roles';
  data: any;
  tituloModal = '';
  messageCodigo = false;
  messageCodigo2 = false;
  messageNombre = false;
  controlFuncion: number;
  focusCodigo: boolean;
  inputDisabled: boolean;
  /*
  * 1=Alta
  * 2=Editar
  * */
  controlBoton: boolean;
  roleJson = {idRole: 0, codigo: 0, nombre: ''};
  datax: {};
  dataTipox: {};
  roleDto: any;
  /* Datos validaciones */
  validacionesDto: any;
  errorDto: any;

  constructor(private readonly modalService: NgbModal,
              private readonly service: RoleService) { }

  ngOnInit(): void {
    this.listado(this.pageSize, this.pageIndex);
  }

  /*Modal*/
  open(content) {
    this.controlBoton = true;
    this.controlFuncion = 1;
    this.clearNota();
    this.listadoTipos();
    this.tituloModal = 'Nuevo Rol';
    this.modalReference = this.modalService.open(content, {centered: true});
    this.focusCodigo = true;
  }

  clearNota() {
    this.roleJson.codigo = null;
    this.roleJson.nombre = null;
    this.roleJson.idRole = null;
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
    if (this.roleJson.codigo < 1) {
      this.messageCodigo = true;
    } else if (this.roleJson.nombre == null || this.roleJson.nombre === '') {
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

  modalEditar(role, content) {
    this.controlBoton = true;
    this.controlFuncion = 2;
    this.clearNota();
    this.listadoTipos();
    this.tituloModal = 'Editar Role';
    this.roleJson.codigo = role.codigo;
    this.roleJson.nombre = role.nombre;
    this.roleJson.idRole = role.idRole;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  modalVisualizar(role, content) {
    this.controlBoton = false;
    this.clearNota();
    this.listadoTipos();
    this.inputDisabled = true;
    this.tituloModal = 'Visualizar Rol';
    this.roleJson.codigo = role.codigo;
    this.roleJson.nombre = role.nombre;
    this.roleJson.idRole = role.idRole;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  /*Fin Modal*/

  /*Metodos CRUD*/
  async listado(size, page) {
    this.data = await this.service.listadoRole(size, page);
    this.datax = this.data.content;
    this.length = this.data.totalElements;
  }

  async agregar() {
    this.roleDto = await this.service.crea(this.roleJson);
    if (this.roleDto.code === 4) {
      this.messageCodigo2 = true;
    } else {
      this.listado(this.pageSize, this.pageIndex);
      this.modalReference.close();
      console.log(this.roleDto);
      await this.crearValidaciones();
      swal({
        title: 'Exito!',
        text: 'Registro ingresado correctamente.',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async modificar() {
    this.roleDto = await this.service.modificar(this.roleJson);
    if (this.roleDto.code === 4) {
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
    this.errorDto = await this.service.validacionGradoRelacionado(tipo.idRole);
    if (this.errorDto.code === 91) {
        swal({
            title: 'Error',
            text: 'Rol se encuentra relacionado en algun grado.',
            type: 'warning',
            confirmButtonText: 'Ok'
        });
    } else {
        this.errorDto = await this.service.eliminarValidaciones(tipo.idRole);
        this.roleDto = await this.service.eliminar(tipo.idRole);
        if (this.roleDto.code === 6) {
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
  }

  async listadoTipos() {
    this.dataTipox = await this.service.listadoTipo();
  }

  refrescar($evento) {
    this.listado(this.pageSize, this.pageIndex - 1);
    return $evento;
  }

  async crearValidaciones() {
        this.validacionesDto = this.service.creaValidaciones(this.roleDto.idRole);
  }

}
