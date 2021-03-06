import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule, MatTooltipModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RoutingModule} from './routing/routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {BusynessModule, LoaderType} from 'busyness';
import {FlextModule} from 'flext';
import {FlextStagesService} from './shared/flext-stages.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {PeticionesHttpService} from './shared/peticiones-http.service';
import {NgbModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {BarraLateralComponent} from './menu/barra-lateral/barra-lateral.component';
import {NavbarComponent} from './menu/navbar/navbar.component';
import {LoginComponent} from './schema/seguridad/login/login.component';
import {InicioComponent} from './schema/datacenter/inicio/inicio.component';
import {SeleccionComponent} from './schema/seguridad/seleccion/seleccion.component';
import {EstadosInscripcionesComponent} from './schema/datacenter/estados-inscripciones/estados-inscripciones.component';
import {PeriodoComponent} from './schema/datacenter/periodo/periodo.component';
import {GradoComponent} from './schema/datacenter/grado/grado.component';
import {InscripcionComponent} from './schema/datacenter/inscripcion/inscripcion.component';
import {TipoMenuComponent} from './schema/datacenter/tipo-menu/tipo-menu.component';
import {MenuPrincipalComponent} from './schema/seguridad/menu-principal/menu-principal.component';
import {RoleComponent} from './schema/seguridad/role/role.component';
import {UsuarioComponent} from './schema/seguridad/usuario/usuario.component';
import {AsignarAgenciasComponent} from './schema/seguridad/asignar-agencias/asignar-agencias.component';
import { ValidacionesInscripcionesComponent } from './schema/datacenter/validaciones-inscripciones/validaciones-inscripciones.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProfesionComponent } from './schema/datacenter/profesion/profesion.component';
import { EstadoCivilComponent } from './schema/datacenter/estado-civil/estado-civil.component';
import { OcupacionComponent } from './schema/datacenter/ocupacion/ocupacion.component';
import { TipoIdentificacionComponent } from './schema/datacenter/tipo-identificacion/tipo-identificacion.component';
import { GeografiaComponent } from './schema/datacenter/geografia/geografia.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    SeleccionComponent,
    EstadosInscripcionesComponent,
    PeriodoComponent,
    GradoComponent,
    InscripcionComponent,
    TipoMenuComponent,
    MenuPrincipalComponent,
    RoleComponent,
    UsuarioComponent,
    AsignarAgenciasComponent,
    ValidacionesInscripcionesComponent,
    ProfesionComponent,
    EstadoCivilComponent,
    OcupacionComponent,
    TipoIdentificacionComponent,
    GeografiaComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    NgbModule.forRoot(),
    FormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
      NgbTypeaheadModule,
    BusynessModule.forRoot({
      loaderType: LoaderType.BALL_SCALE_MULTIPLE
    }),
    FlextModule.forRoot([
      FlextStagesService
    ])
  ],
  providers: [PeticionesHttpService, DecimalPipe, DatePipe, {provide: MAT_DATE_LOCALE, useValue: 'es-GT'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
