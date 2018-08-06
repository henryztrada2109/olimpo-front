import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EstadoInscripcionesService} from './estado-inscripciones.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estados-inscripciones',
  templateUrl: './estados-inscripciones.component.html',
  styleUrls: ['./estados-inscripciones.component.css'],
  providers: [EstadoInscripcionesService],
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
export class EstadosInscripcionesComponent implements OnInit {

  listadoGeneral: {};
  tituloModal: string;
  messageCodigo: boolean;
  messageDescripcion: boolean;
  textoMensaje: string;
  controlBoton: boolean;
  focusCodigo: boolean;
  inputDisabled: boolean;
  estadoJson = {codigo: 0, descripcion: '', idEstado: 0};
  modalReference: NgbModalRef;
  estadoDto: any;

  constructor(private readonly service: EstadoInscripcionesService,
              private readonly modalService: NgbModal) { }

  ngOnInit(): void {
    this.listadoEstados();
  }

  async listadoEstados() {
      this.listadoGeneral = await this.service.listadoGeneral();
  }

  closeModal() {
    this.modalReference.close();
  }

  async confirmaModal() {
    if (this.estadoJson.descripcion === '') {
      this.messageDescripcion = true;
      this.textoMensaje = 'Descripcion no puede ser blanco';
    } else {
      this.estadoDto = await this.service.modificar(this.estadoJson);
      this.listadoEstados();
      this.modalReference.close();
      swal({
          title: 'Exito!',
          text: 'Registro modificado correctamente.',
          type: 'success',
          confirmButtonText: 'Ok'
      });
    }
  }

  editar(content, estado) {
    this.tituloModal = 'Editar Estado';
    this.iniciarModal();
    this.estadoJson.codigo = estado.codigo;
    this.estadoJson.descripcion = estado.descripcion;
    this.estadoJson.idEstado = estado.idEstado;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  iniciarModal() {
    this.messageCodigo = false;
    this.messageDescripcion = false;
    this.textoMensaje = '';
    this.inputDisabled = false;
    this.controlBoton = true;
    this.estadoJson.codigo = null;
    this.estadoJson.descripcion = '';
    this.estadoJson.idEstado = null;
  }

  visualizar(content, estado) {
      this.tituloModal = 'Detalle Estado';
      this.iniciarModal();
      this.estadoJson.codigo = estado.codigo;
      this.estadoJson.descripcion = estado.descripcion;
      this.estadoJson.idEstado = estado.idEstado;
      this.controlBoton = false;
      this.inputDisabled = true;
      this.modalReference = this.modalService.open(content, {centered: true});
  }

}
