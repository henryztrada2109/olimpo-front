import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../schema/login/login.component';
import {NoLoginGuard} from '../guard/no-login.guard';
import {InicioComponent} from '../schema/inicio/inicio.component';
import {SeleccionGuard} from '../guard/seleccion.guard';
import {SeleccionComponent} from '../schema/seleccion/seleccion.component';
import {LoginGuard} from '../guard/login.guard';
import {EstadosInscripcionesComponent} from '../schema/estados-inscripciones/estados-inscripciones.component';
import {PeriodoComponent} from '../schema/periodo/periodo.component';
import {GradoComponent} from '../schema/grado/grado.component';
import {InscripcionComponent} from '../schema/inscripcion/inscripcion.component';
import {TipoMenuComponent} from '../schema/tipo-menu/tipo-menu.component';
import {MenuPrincipalComponent} from '../schema/menu-principal/menu-principal.component';
import {RoleComponent} from '../schema/role/role.component';
import {UsuarioComponent} from '../schema/usuario/usuario.component';
import {AsignarAgenciasComponent} from '../schema/asignar-agencias/asignar-agencias.component';


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
  {path: 'asignarAgencia', component: AsignarAgenciasComponent, canActivate: [SeleccionGuard]}
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
