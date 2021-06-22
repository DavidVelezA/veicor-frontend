// imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PagoComponent } from './components/pago/pago.component';
import { RegisterComponent } from './components/register/register.component';




// importar componentes
import { TiendaComponent } from "./components/tienda/tienda.component";
import { PagesComponent } from './pages/pages.component';






// definir las rutas
const appRoutes: Routes = [

      {
            path: '',
            component: PagesComponent,
            children:
                  [

                        // {path: '', component: LoginComponent},
                        { path: 'tienda', component: TiendaComponent },
                        { path: 'inicio', component: InicioComponent },                        
                        { path: 'pago', component: PagoComponent },

                        
                  ]
            },
            
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: '**', component: TiendaComponent },

];

// exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);




