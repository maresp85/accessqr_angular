import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

//Fechas
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import localeEsCo from '@angular/common/locales/es-CO'; 
registerLocaleData(localePy, 'es');
registerLocaleData(localeEsCo, 'es-Co');

//Rutas
import { ROUTES } from "./app.routes";
//Servicios
import { OrdenesService } from './services/ordenes.service';
import { UsuarioService } from './services/usuario.service';
import { ConfiguracionService } from './services/configuracion.service';
//Componentes shared
import { LoadingComponent } from './shared/loading/loading.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TitleComponent } from './shared/title/title.component';
//Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//Componentes administración
import { ListarUsuariosComponent } from './components/administracion/usuarios/listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './components/administracion/usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './components/administracion/usuarios/editar-usuarios/editar-usuarios.component';
import { EditarUsuariosClaveComponent } from './components/administracion/usuarios/editar-usuarios-clave/editar-usuarios-clave.component';
//Componentes configuración
import { ListarObrasComponent } from './components/configuracion/obras/listar-obras/listar-obras.component';
import { CrearObrasComponent } from './components/configuracion/obras/crear-obras/crear-obras.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    TitleComponent,    
    HomeComponent,    
    LoginComponent,
    ListarObrasComponent,
    CrearObrasComponent,
    CrearUsuariosComponent,
    ListarUsuariosComponent,
    EditarUsuariosComponent,
    EditarUsuariosClaveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [OrdenesService, 
              UsuarioService, 
              ConfiguracionService,
              { provide: LOCALE_ID, useValue: "es" },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
