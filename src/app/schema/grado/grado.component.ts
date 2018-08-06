import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GradoService} from './grado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css'],
    providers: [GradoService],
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
export class GradoComponent implements OnInit {

    /* Variables Primer Modal */
    tituloModal: string;
    controlBoton: boolean;
    controlFuncion: number;
    modalReference: NgbModalRef;
    inputDisabled: boolean;
    /* Variables Segundo Modal */
    tituloSegundoModal: string;
    controlSegundoBoton: boolean;
    controlSegundaFuncion: number;
    segundoModalReference: NgbModalRef;
    segundoInputDisabled: boolean;
    /*Variables Validaciones */
    messageCodigo: boolean;
    messageNombre: boolean;
    messageTipo: boolean;
    textoMensaje: string;
    /*Variables Validaciones Segundo Modal */
    messageCodigoSeccion: boolean;
    messageNombreSeccion: boolean;
    messageCapacidadSeccion: boolean;
    textoMensajeSeccion: string;
    /* Variables de Datos */
    gradoJson = {idGrado: 0, idTipoMenu: 0, nombre: '', orden: 0};
    dataTipos: {};
    gradoDto: any;
    seccionDto: any;
    seccionJson = {capacidad: 0, idGrado: 0, idSeccion: 0, nombre: '', orden: 0};
    /* Variables primer listado */
    data1: any;
    data1Pagineo: {};
    length1: number;
    pageSize: number;
    pageIndex: number;
    /* Variables segundo listado */
    seccionesTemporal = [];
    dataSecciones: any;
    dataSeccionesList = [];
    /* Variables control vista */
    controlNivel: number;
    displayedColumns: string[] = ['codigo', 'nombre', 'cantidadSecciones'];

  constructor(private readonly modalService: NgbModal,
              private readonly service: GradoService) { }

  ngOnInit() {
      this.pageSize = 10;
      this.pageIndex = 0;
      this.controlNivel = 1;
      this.listadoPrincipal(this.pageSize, this.pageIndex);
  }

  /* Funciones Primer Modal */
  open(content) {
      this.tituloModal = 'Nuevo grado'
      this.controlFuncion = 1;
      this.iniciarModal();
      /*this.modalReference = this.modalService.open(content, {centered: true, size: 'lg'});*/
      this.controlNivel = 2;
  }

  confirmaModal() {
        this.detenerAlertasPrimerModal();
        if (this.gradoJson.orden < 1) {
            this.messageCodigo = true;
            this.textoMensaje = 'Debe ingresar un codigo.';
        } else if (this.gradoJson.nombre == null || this.gradoJson.nombre === '') {
            this.messageNombre = true;
            this.textoMensaje = 'Debe ingresar un nombre.';
        } else if (this.gradoJson.idTipoMenu < 1) {
            this.messageTipo = true;
            this.textoMensaje = 'Debe seleccionar un tipo de menu para iniciar el usuario.';
        } else if (this.seccionesTemporal.length < 1) {
            swal({
                title: 'Error!',
                text: 'Debe ingresar al menos una seccion para el grado',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            if (this.controlFuncion === 1) {
                this.crearGrado();
            } else {
                this.modificarGrado();
            }
        }
  }

  closeModal() {
    this.modalReference.close();
  }

  iniciarModal() {
    this.inputDisabled = false;
    this.controlBoton = true;
    this.listadoTipos();
    this.gradoJson.idGrado = null;
    this.gradoJson.idTipoMenu = 0;
    this.gradoJson.nombre = null;
    this.gradoJson.orden = null;
    this.seccionesTemporal = [];
    this.detenerAlertasPrimerModal();
  }

  detenerAlertasPrimerModal() {
      this.messageCodigo = false;
      this.messageNombre = false;
      this.messageTipo = false;
  }

  async editarGrado(content, grado) {
      this.tituloModal = 'Editar grado'
      this.controlFuncion = 2;
      this.iniciarModal();
      this.gradoJson.idTipoMenu = grado.idTipoMenu;
      this.gradoJson.nombre = grado.nombre;
      this.gradoJson.orden = grado.orden;
      this.gradoJson.idGrado = grado.idGrado;
      this.dataSecciones = await this.service.listadoSecciones(grado.idGrado);
      this.dataSeccionesList = this.dataSecciones;
      const me = this;
      await this.dataSeccionesList.forEach( async function (el, i) {
          await me.seccionesTemporal.push(el);
      });
      this.controlNivel = 2;
  }

  async detalleGrado(content, grado) {
        this.tituloModal = 'Editar grado'
        this.controlFuncion = 2;
        this.iniciarModal();
        this.gradoJson.idTipoMenu = grado.idTipoMenu;
        this.gradoJson.nombre = grado.nombre;
        this.gradoJson.orden = grado.orden;
        this.gradoJson.idGrado = grado.idGrado;
        this.inputDisabled = true;
        this.controlBoton = false;
        this.dataSecciones = await this.service.listadoSecciones(grado.idGrado);
        this.dataSeccionesList = this.dataSecciones;
        const me = this;
        await this.dataSeccionesList.forEach( async function (el, i) {
            await me.seccionesTemporal.push(el);
        });
        this.controlNivel = 2;
  }

  eliminarGrado(id) {
      swal({
          title: 'Advertencia',
          text: 'Deceo eliminar el grado?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, Acepto!'
      }).then((result) => {
          if (result.value) {
              this.bajaGrado(id);
          }
      });
  }

  /* Funciones Segundo Modal */
  segundoOpen(segundoModal) {
        this.tituloSegundoModal = 'Nueva seccion'
        this.controlSegundaFuncion = 1;
        this.iniciarSegundoModal();
        this.segundoModalReference = this.modalService.open(segundoModal, {centered: true});
  }

  confirmaSegundoModal() {
      this.detenerAlertasSegundoModal();
        if (this.seccionJson.orden < 1) {
            this.messageCodigoSeccion = true;
            this.textoMensajeSeccion = 'Debe ingresar el codigo para la seccion';
        } else if (this.seccionJson.nombre === '' || this.seccionJson.nombre == null) {
            this.messageNombreSeccion = true;
            this.textoMensajeSeccion = 'Debe ingresar un nombre para la seccion';
        } else if (this.seccionJson.capacidad < 1) {
            this.messageCapacidadSeccion = true;
            this.textoMensajeSeccion = 'Debe ingresar la capacidad maxima para la seccion';
        } else {
            if (this.controlSegundaFuncion === 1) {
                this.agregarSeccionTemporal();
            } else {
                this.modificarSeccion();
            }
        }
  }

  closeSegundoModal() {
        this.segundoModalReference.close();
  }

  iniciarSegundoModal() {
        this.segundoInputDisabled = false;
        this.controlSegundoBoton = true;
        this.seccionJson = {capacidad: 0, idGrado: 0, idSeccion: 0, nombre: '', orden: 0};
        this.seccionJson.idSeccion = null;
        this.seccionJson.capacidad = null;
        this.seccionJson.nombre = null;
        this.seccionJson.orden = null;
        this.seccionJson.idGrado = null;
        this.detenerAlertasSegundoModal();
  }

  detenerAlertasSegundoModal() {
      this.messageCapacidadSeccion = false;
      this.messageCodigoSeccion = false;
      this.messageNombreSeccion = false;
  }

  editarSeccion(segundoModal, seccion) {
      this.tituloSegundoModal = 'Editar seccion'
      this.controlSegundaFuncion = 2;
      this.iniciarSegundoModal();
      this.seccionJson.idGrado = seccion.idGrado;
      this.seccionJson.orden = seccion.orden;
      this.seccionJson.nombre = seccion.nombre;
      this.seccionJson.capacidad = seccion.capacidad;
      this.seccionJson.idSeccion = seccion.idSeccion;
      this.segundoModalReference = this.modalService.open(segundoModal, {centered: true});
  }

  visualizarSeccion(segundoModal, seccion) {
        this.tituloSegundoModal = 'Detalle seccion'
        this.controlSegundaFuncion = 2;
        this.iniciarSegundoModal();
        this.seccionJson.idGrado = seccion.idGrado;
        this.seccionJson.orden = seccion.orden;
        this.seccionJson.nombre = seccion.nombre;
        this.seccionJson.capacidad = seccion.capacidad;
        this.seccionJson.idSeccion = seccion.idSeccion;
        this.segundoInputDisabled = true;
        this.controlSegundoBoton = false;
        this.segundoModalReference = this.modalService.open(segundoModal, {centered: true});
  }

  /* Control vista */
    cancelar() {
        this.controlNivel = 1;
    }

  /* Solicitud de datos */
  async listadoTipos() {
        this.dataTipos = await this.service.listadoTipos();
  }

  async crearGrado() {
      this.gradoDto = await this.service.creaGrado(this.gradoJson);
      if (this.gradoDto.code === 10) {
          const me = this;
          await this.seccionesTemporal.forEach( async function (el, i) {
              el.idSeccion = 0;
              el.idGrado = me.gradoDto.idGrado;
              me.seccionDto = await me.service.creaSeccion(el);
          });
          await this.listadoPrincipal(this.pageSize, this.pageIndex);
          this.controlNivel = 1;
          swal({
              title: 'Exito!',
              text: 'Registro ingresado correctamente.',
              type: 'success',
              confirmButtonText: 'Ok'
          });
      } else {
          swal({
              title: 'Error!',
              text: 'Error ocurrido al interar crear el registro',
              type: 'error',
              confirmButtonText: 'Ok'
          });
      }
  }

    async listadoPrincipal(size, page) {
        this.data1 = await this.service.listadoGrados(size, page);
        this.data1Pagineo = this.data1.content;
        this.length1 = this.data1.totalElements;
    }

    async modificarGrado() {
      this.gradoDto = await this.service.modificarGrado(this.gradoJson);
        if (this.gradoDto.code === 11) {
            await this.listadoPrincipal(this.pageSize, this.pageIndex);
            this.controlNivel = 1;
            swal({
                title: 'Exito!',
                text: 'Registro modificado correctamente.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            swal({
                title: 'Error!',
                text: 'Error ocurrido al interar modificar el registro',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async bajaGrado(id) {
      this.gradoDto = await this.service.eliminarGrado(id);
      if (this.gradoDto.code === 12) {
          this.listadoPrincipal(this.pageSize, this.pageIndex);
          this.modalReference.close();
          swal({
              title: 'Exito!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonText: 'Ok'
          });
      } else if (this.gradoDto.code === 6) {
          swal({
              title: 'Advertencia!',
              text: 'Primero debe eliminar las secciones del grado.',
              type: 'warning',
              confirmButtonText: 'Ok'
          });
      } else {
            swal({
                title: 'Error!',
                text: 'Error ocurrido al interar eliminar el registro',
                type: 'error',
                confirmButtonText: 'Ok'
            });
      }
    }

    async agregarSeccionTemporal() {
      try {
          this.seccionJson.idSeccion = Date.now();
          this.segundoModalReference.close();
          if (this.controlFuncion !== 1) {
              this.seccionJson.idGrado = this.gradoJson.idGrado;
              this.seccionJson.idSeccion = 0;
              this.seccionDto = await this.service.creaSeccion(this.seccionJson);
              if (this.seccionDto.code === 10) {
                  this.seccionJson.idSeccion = this.seccionDto.idSeccion;
                  this.seccionesTemporal.push(this.seccionJson);
                  await this.listadoPrincipal(this.pageSize, this.pageIndex);
                  swal({
                      title: 'Exito!',
                      text: 'Registro creado correctamente.',
                      type: 'success',
                      confirmButtonText: 'Ok'
                  });
              } else if (this.seccionDto.code === 6) {
                  swal({
                      title: 'Error!',
                      text: 'Grado no existe en la base de datos',
                      type: 'error',
                      confirmButtonText: 'Ok'
                  });
              }
          } else {
              this.seccionesTemporal.push(this.seccionJson);
              swal({
                  title: 'Exito!',
                  text: 'Registro creado correctamente.',
                  type: 'success',
                  confirmButtonText: 'Ok'
              });
          }
      } catch (e) {
            this.funcionErrorServer();
      }
    }

    async modificarSeccion() {
      const me = this;
      try {
          this.seccionesTemporal.forEach(async function (el, i) {
              if (el.idSeccion === me.seccionJson.idSeccion) {
                  me.seccionesTemporal[i] = me.seccionJson;
                  me.segundoModalReference.close();
                  if (me.controlFuncion !== 1) {
                      me.seccionDto = await me.service.modificarSeccion(me.seccionJson);
                      if (me.seccionDto.code === 11) {
                          swal({
                              title: 'Exito!',
                              text: 'Registro modificado correctamente.',
                              type: 'success',
                              confirmButtonText: 'Ok'
                          });
                      } else if (me.seccionDto.code === 4) {
                          swal({
                              title: 'Error!',
                              text: 'Codigo de grado no existe.',
                              type: 'error',
                              confirmButtonText: 'Ok'
                          });
                      }
                  } else {
                      swal({
                          title: 'Exito!',
                          text: 'Registro modificado correctamente.',
                          type: 'success',
                          confirmButtonText: 'Ok'
                      });
                  }
              }
          });
      } catch (e) {
          this.funcionErrorServer();
      }
    }

    eliminarSeccion(seccion) {
      try {
          this.iniciarSegundoModal();
          this.seccionJson.idGrado = seccion.idGrado;
          this.seccionJson.orden = seccion.orden;
          this.seccionJson.nombre = seccion.nombre;
          this.seccionJson.capacidad = seccion.capacidad;
          this.seccionJson.idSeccion = seccion.idSeccion;
          const me = this;
          this.seccionesTemporal.forEach(async function (el, i) {
              if (el.idSeccion === me.seccionJson.idSeccion) {
                  me.seccionesTemporal.splice(i, 1);
                  if (me.controlFuncion !== 1) {
                      me.seccionDto = await me.service.eliminarSeccion(me.seccionJson.idSeccion);
                      if (me.seccionDto.code === 12) {
                          swal({
                              title: 'Exito!',
                              text: 'Registro eliminado correctamente.',
                              type: 'success',
                              confirmButtonText: 'Ok'
                          });
                      } else {
                          swal({
                              title: 'Error!',
                              text: 'Ha ocurrido un error al tratar de eliminar el registro.',
                              type: 'error',
                              confirmButtonText: 'Ok'
                          });
                      }
                  } else {
                      swal({
                          title: 'Exito!',
                          text: 'Registro eliminado correctamente.',
                          type: 'success',
                          confirmButtonText: 'Ok'
                      });
                  }
              }
          });
      } catch (e) {
          this.funcionErrorServer();
      }
    }

    funcionErrorServer() {
        swal({
            title: 'Error!',
            text: 'Error de comunicacion con el servidor.',
            type: 'error',
            confirmButtonText: 'Ok'
        });
    }

    refrescar($evento) {
        this.listadoPrincipal(this.pageSize, this.pageIndex - 1);
        return $evento;
    }
}
