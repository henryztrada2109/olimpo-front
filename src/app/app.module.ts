import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule
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
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {BarraLateralComponent} from './menu/barra-lateral/barra-lateral.component';
import {NavbarComponent} from './menu/navbar/navbar.component';
import {LoginComponent} from './schema/login/login.component';
import {InicioComponent} from './schema/inicio/inicio.component';
import {SeleccionComponent} from './schema/seleccion/seleccion.component';
import {EstadosInscripcionesComponent} from './schema/estados-inscripciones/estados-inscripciones.component';
import {PeriodoComponent} from './schema/periodo/periodo.component';
import {GradoComponent} from './schema/grado/grado.component';
import {InscripcionComponent} from './schema/inscripcion/inscripcion.component';
import {TipoMenuComponent} from './schema/tipo-menu/tipo-menu.component';
import {MenuPrincipalComponent} from './schema/menu-principal/menu-principal.component';
import {RoleComponent} from './schema/role/role.component';
import {UsuarioComponent} from './schema/usuario/usuario.component';
import {AsignarAgenciasComponent} from './schema/asignar-agencias/asignar-agencias.component';

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
    AsignarAgenciasComponent
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
    MatIconModule,
    NgbModule.forRoot(),
    FormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
