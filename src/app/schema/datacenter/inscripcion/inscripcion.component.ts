import { Component, OnInit } from '@angular/core';
import {FlextHandler} from 'flext';
import {InscripcionService} from './inscripcion.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css'],
    providers: [InscripcionService]
})
export class InscripcionComponent implements OnInit {

    /* Control secciones a mostrar en pantalla*/
    controlNivel: number;
    controlBoton: boolean;
    indexInscripcion: number;
    pasosAprobados: number;
    /* Listado de datos */
    dataGrados: any[];
    dataPeriodosAny: any;
    dataPeriodosArray = [];
    dataProfesiones: any[];
    dataEstadosCiviles: any[];
    /* Control de listados */
    periodoActual: number;
    /* Objectos de inscripciones */
    inscripcionJson = {
        idGrado: 0, idPeriodo: 0, nombres: '', apellidos: '', genero: '', dia: 0, mes: 0, anio: 0, telefonoCasa: 0,
        telefonoCelular: 0, correo: '', idProfesion: 0, idEstadoCivil: 0, idOcupacion: 0, idTipoIdentificacion: 0, identificacion: '',
        idPais: 0, idDepartamento: 0, idMunicipio: 0, direccion: ''
    };
    fechaNacimiento = {year: 0, month: 0, day: 0};
    /* Control de errores */
    textoMensaje: string;
    messageGradoInscribir: boolean;
    messagePeriodo: boolean;
    messageNombres: boolean;
    messageApellidos: boolean;
    messageGenero: boolean;
    messageFechaNacimiento: boolean;
    messageTelefonoCasa: boolean;
    messageTelefonoCelular: boolean;
    messageCorreo: boolean;
    messageProfesion: boolean;
    messageEstadoCivil: boolean;
    messageOcupacion: boolean;
    messageTipoIdentificacion: boolean;
    messageIdentificacion: boolean;
    messagePais: boolean;
    messageDepartamento: boolean;
    messageMunicipio: boolean;
    messageDireccion: boolean;
    /* Objetos obtenidos */
    validacionesDto: any;
    gradoDto: any;
    /* Variables */
    sexo: boolean;

    constructor(private readonly service: InscripcionService) {
    }

    ngOnInit() {
        this.cargaDatos();
    }

    @FlextHandler()
    async cargaDatos() {
        this.controlNivel = 1;
        await this.cargaGrados();
        await this.cargaPeriodos();
    }

    formularioCreacion() {
        this.controlNivel = 2;
        this.pasosAprobados = 1;
        this.iniciarFormulario();
    }

    @FlextHandler()
    async iniciarFormulario() {
        this.controlBoton = true;
        this.indexInscripcion = 1;
        this.pasosAprobados = 1;
        this.inscripcionJson.idGrado = 0;
        this.inscripcionJson.idPeriodo = 0;
        this.inscripcionJson.nombres = null;
        this.inscripcionJson.apellidos = null;
        this.inscripcionJson.genero = null;
        this.inscripcionJson.dia = 0;
        this.inscripcionJson.mes = 0;
        this.inscripcionJson.anio = 0;
        this.fechaNacimiento.day = 0;
        this.fechaNacimiento.month = 0;
        this.fechaNacimiento.year = 0;
        this.inscripcionJson.telefonoCasa = null;
        this.inscripcionJson.telefonoCelular = null;
        this.inscripcionJson.correo = '';
        this.inscripcionJson.idProfesion = 0;
        this.inscripcionJson.idEstadoCivil = 0;
        this.inscripcionJson.idOcupacion = 0;
        this.inscripcionJson.idTipoIdentificacion = 0;
        this.inscripcionJson.identificacion = '';
        this.inscripcionJson.idPais = 0;
        this.inscripcionJson.idDepartamento = 0;
        this.inscripcionJson.idMunicipio = 0;
        this.inscripcionJson.direccion = '';
        this.sexo = null;
        await this.cargaGrados();
        await this.cargaPeriodos();
        await this.cargaProfesiones();
        await this.cargaEstadosCiviles();
        this.iniciarErrores();
    }

    async iniciarErrores() {
        this.messageGradoInscribir = false;
        this.messagePeriodo = false;
        this.messageNombres = false;
        this.messageApellidos = false;
        this.messageGenero = false;
        this.messageFechaNacimiento = false;
        this.messageTelefonoCasa = false;
        this.messageTelefonoCelular = false;
        this.messageCorreo = false;
        this.messageProfesion = false;
        this.messageEstadoCivil = false;
        this.messageOcupacion = false;
        this.messageTipoIdentificacion = false;
        this.messageIdentificacion = false;
        this.messagePais = false;
        this.messageDepartamento = false;
        this.messageMunicipio = false;
        this.messageDireccion = false;
    }

    async cargaGrados() {
        this.dataGrados = await this.service.listadoGrados();
    }

    async cargaProfesiones() {
        this.dataProfesiones = await this.service.listadoProfesiones();
    }

    async cargaEstadosCiviles() {
        this.dataEstadosCiviles = await this.service.listadoEstadosCiviles();
    }

    async cargaPeriodos() {
        this.dataPeriodosAny = await this.service.listadoPeriodos();
        this.dataPeriodosArray = this.dataPeriodosAny;
        const me = this;
        this.dataPeriodosArray.forEach(function (el, i) {
            if (el.periodoActual === true) {
                me.periodoActual = el.idPeriodo;
            }
        });
    }

    cerrarFormulario() {
        this.controlNivel = 1;
        this.cargaPeriodos();
    }

    async confirmarFormulario() {
        if (this.inscripcionJson.idGrado > 0) {
            this.gradoDto = await this.dataGrados.find(grado => grado.idGrado === this.inscripcionJson.idGrado);
            await this.cargarValidaciones();
        }
        this.iniciarErrores();
        if (this.controlNivel === 2) {
            this.inscripcionJson.idPeriodo = this.periodoActual;
            if (this.inscripcionJson.idGrado === 0) {
                this.messageGradoInscribir = true;
                this.textoMensaje = 'Debe seleccionar el grado al cual inscribir el alumno.';
            } else if (this.inscripcionJson.idPeriodo === 0 && this.validacionesDto.periodo === true) {
                this.messagePeriodo = true;
                this.textoMensaje = 'Debe seleccionar un periodo para la inscripcion.';
            } else if (this.inscripcionJson.nombres === '' && this.validacionesDto.nombres === true || this.inscripcionJson.nombres === null
                && this.validacionesDto.nombres === true) {
                this.messageNombres = true;
                this.textoMensaje = 'Debe ingresar los nombres del alumno.';
            } else if (this.inscripcionJson.apellidos === '' && this.validacionesDto.apellidos === true ||
                this.inscripcionJson.apellidos === null && this.validacionesDto.apellidos === true) {
                this.messageApellidos = true;
                this.textoMensaje = 'Debe ingresar los apellidos del alumno.';
            } else if (this.sexo === null && this.validacionesDto.genero === true) {
                this.messageGenero = true;
                this.textoMensaje = 'Debe seleccionar el genero del alumno.';
            } else if (this.fechaNacimiento.year === 0 && this.validacionesDto.fechaNacimiento === true) {
                this.messageFechaNacimiento = true;
                this.textoMensaje = 'Debe ingresar la fecha de nacimiento del alumno.';
            } else if (this.fechaNacimiento.year === undefined) {
                this.messageFechaNacimiento = true;
                this.textoMensaje = 'Debe ingresar una fecha valida.';
            } else if (this.inscripcionJson.telefonoCasa < 1 && this.validacionesDto.telefonoCasa === true) {
                this.messageTelefonoCasa = true;
                this.textoMensaje = 'Debe ingresar un numero de telefono.';
            } else if (this.inscripcionJson.telefonoCelular < 1 && this.validacionesDto.telefonoCelular === true) {
                this.messageTelefonoCelular = true;
                this.textoMensaje = 'Debe ingresar un numero de celular.';
            } else if (this.inscripcionJson.correo === null && this.validacionesDto.correoElectronico === true ||
                this.inscripcionJson.correo === '' && this.validacionesDto.correoElectronico === true) {
                this.messageCorreo = true;
                this.textoMensaje = 'Debe ingresar un correo electronico para el alumno.';
            } else if (this.inscripcionJson.idProfesion === 0 && this.validacionesDto.profesion === true) {
                this.messageProfesion = true;
                this.textoMensaje = 'Debe ingresar una profesion para el alumno.';
            } else if (this.inscripcionJson.idEstadoCivil === 0 && this.validacionesDto.estadoCivil === true) {
                this.messageEstadoCivil = true;
                this.textoMensaje = 'Debe ingresar un estado para el alumno.';
            } else {
                this.controlNivel = 3;
                this.indexInscripcion = 2;
                if (this.pasosAprobados < 2) {
                    this.pasosAprobados = 2;
                }
            }
        }
    }

    async cargarValidaciones() {
        this.validacionesDto = await this.service.validaciones(this.gradoDto.idRole);
    }

    muestraDenuevo(posicion: number) {
        if (posicion !== this.controlNivel) {
            if (posicion === 2 && this.pasosAprobados > 1) {
                this.controlNivel = posicion;
            } else if (posicion === 3 && this.pasosAprobados > 1) {
                this.controlNivel = posicion;
            }
        }
    }




}
