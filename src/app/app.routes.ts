import { Routes } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//Componentes administración
import { ListarUsuariosComponent } from './components/administracion/usuarios/listar-usuarios/listar-usuarios.component';
//Componentes configuracion
import { ListarCodigoComponent } from './components/configuracion/codigos/listar-codigos/listar-codigo.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },
    //Administración
    { path: 'listarusuarios', component: ListarUsuariosComponent, canActivate: [ AuthGuard ] },     
    //Configuración     
    { path: 'listarcodigo', component: ListarCodigoComponent, canActivate: [ AuthGuard ] },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
]