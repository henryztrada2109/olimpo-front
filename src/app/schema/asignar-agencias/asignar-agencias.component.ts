import { Component, OnInit } from '@angular/core';
import {AsignarAgenciasService} from './asignar-agencias.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-asignar-agencias',
  templateUrl: './asignar-agencias.component.html',
  styleUrls: ['./asignar-agencias.component.css'],
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
export class AsignarAgenciasComponent implements OnInit {

  title = 'Asignacion de Agencias';
  rolFiltro: number;
  usuarioFiltro: string;
  dataPage: any;
  dataArray: {};
  length: number;
  pageSize = 25;
  pageIndex = 0;
  dataRoles: {};
  modalReference: NgbModalRef;
  tituloModal: string;
  dataEmpresas: {};
  relacionDto: any;
  relacionJson = {idRelacion: 0, idEmpresa: 0, idUsuario: 0};

  constructor(private readonly service: AsignarAgenciasService,
              private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.listadoRoles();
    this.rolFiltro = 0;
    this.usuarioFiltro = '';
    this.listado(this.pageSize, this.pageIndex);
  }

  async listadoRoles() {
    this.dataRoles = await this.service.listadoRoles();
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

  filtrar() {
    this.listado(this.pageSize, this.pageIndex);
  }

  refrescar($evento) {
    this.listado(this.pageSize, this.pageIndex - 1 );
    return $evento;
  }

  modalVisualizar(usuario, content) {
    this.tituloModal = 'Agencias del Usuario';
    this.listadoEmpresas(usuario.idUsuario);
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  async listadoEmpresas(id) {
    this.dataEmpresas = await this.service.listadoEmpresas(id);
  }

  closeModal() {
    this.modalReference.close();
  }

  async cambioAgencia(empresa) {
    if (empresa.relacion === true) {
      this.relacionJson.idEmpresa = empresa.idEmpresa;
      this.relacionJson.idUsuario = empresa.idUsuario;
      this.relacionJson.idRelacion = null;
      this.relacionDto = this.service.creaRelacion(this.relacionJson);
    } else {
      this.relacionDto = this.service.eliminaRelacion(empresa.idUsuario, empresa.idEmpresa);
    }
  }

}
