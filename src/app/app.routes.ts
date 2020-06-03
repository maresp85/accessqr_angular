import { Routes } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//Componentes administración
import { ListarUsuariosComponent } from './components/administracion/usuarios/listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './components/administracion/usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './components/administracion/usuarios/editar-usuarios/editar-usuarios.component';
import { EditarUsuariosClaveComponent } from './components/administracion/usuarios/editar-usuarios-clave/editar-usuarios-clave.component';
//Componentes configuracion
import { ListarObrasComponent } from './components/configuracion/obras/listar-obras/listar-obras.component';
import { CrearObrasComponent } from './components/configuracion/obras/crear-obras/crear-obras.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },
    //Administración
    { path: 'listarusuarios', component: ListarUsuariosComponent, canActivate: [ AuthGuard ] },    
    { path: 'crearusuarios', component: CrearUsuariosComponent, canActivate: [ AuthGuard ] },  
    { path: 'editarusuarios/:email', component: EditarUsuariosComponent, canActivate: [ AuthGuard ] },  
    { path: 'editarusuariosclave/:email', component: EditarUsuariosClaveComponent, canActivate: [ AuthGuard ] }, 
    //Configuración     
    { path: 'listarobras', component: ListarObrasComponent, canActivate: [ AuthGuard ] },        
    { path: 'crearobras', component: CrearObrasComponent, canActivate: [ AuthGuard ] },  

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
]