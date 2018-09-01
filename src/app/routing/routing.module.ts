import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../schema/seguridad/login/login.component';
import {NoLoginGuard} from '../guard/no-login.guard';
import {InicioComponent} from '../schema/datacenter/inicio/inicio.component';
import {SeleccionGuard} from '../guard/seleccion.guard';
import {SeleccionComponent} from '../schema/seguridad/seleccion/seleccion.component';
import {LoginGuard} from '../guard/login.guard';
import {EstadosInscripcionesComponent} from '../schema/datacenter/estados-inscripciones/estados-inscripciones.component';
import {PeriodoComponent} from '../schema/datacenter/periodo/periodo.component';
import {GradoComponent} from '../schema/datacenter/grado/grado.component';
import {InscripcionComponent} from '../schema/datacenter/inscripcion/inscripcion.component';
import {TipoMenuComponent} from '../schema/datacenter/tipo-menu/tipo-menu.component';
import {MenuPrincipalComponent} from '../schema/seguridad/menu-principal/menu-principal.component';
import {RoleComponent} from '../schema/seguridad/role/role.component';
import {UsuarioComponent} from '../schema/seguridad/usuario/usuario.component';
import {AsignarAgenciasComponent} from '../schema/seguridad/asignar-agencias/asignar-agencias.component';
import {ValidacionesInscripcionesComponent} from '../schema/datacenter/validaciones-inscripciones/validaciones-inscripciones.component';
import {ProfesionComponent} from '../schema/datacenter/profesion/profesion.component';
import {EstadoCivilComponent} from '../schema/datacenter/estado-civil/estado-civil.component';


export const appRoutes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'inicio', component: InicioComponent, canActivate: [SeleccionGuard]},
  {path: 'seleccion', component: SeleccionComponent, canActivate: [LoginGuard]},
  {path: 'estadosInscripciones', component: EstadosInscripcionesComponent, canActivate: [SeleccionGuard]},
  {path: 'periodo', component: PeriodoComponent, canActivate: [SeleccionGuard]},
  {path: 'grado', component: GradoComponent, canActivate: [SeleccionGuard]},
  {path: 'inscripciones', component: InscripcionComponent, canActivate: [SeleccionGuard]},
  {path: 'tipoMenu', component: TipoMenuComponent, canActivate: [SeleccionGuard]},
  {path: 'menuPrincipal', component: MenuPrincipalComponent, canActivate: [SeleccionGuard]},
  {path: 'role', component: RoleComponent, canActivate: [SeleccionGuard]},
  {path: 'usuario', component: UsuarioComponent, canActivate: [SeleccionGuard]},
  {path: 'asignarAgencia', component: AsignarAgenciasComponent, canActivate: [SeleccionGuard]},
  {path: 'validacionesInscripciones', component: ValidacionesInscripcionesComponent, canActivate: [SeleccionGuard]},
  {path: 'profesiones', component: ProfesionComponent, canActivate: [SeleccionGuard]},
  {path: 'estadoCivil', component: EstadoCivilComponent, canActivate: [SeleccionGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
