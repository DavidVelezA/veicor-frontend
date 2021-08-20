import { UsersComponent } from './components/admin/users/users.component';
import { ProductsComponent } from './components/admin/products/products.component';
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
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FacturaComponent } from './components/factura/factura.component';






// definir las rutas
const appRoutes: Routes = [
  { path: '', component: LoginComponent },


      {
            path: '',
            component: PagesComponent,
            children:
                  [

                        // {path: '', component: LoginComponent},
                        { path: 'inicio', component: InicioComponent },
                        { path: 'tienda', component: TiendaComponent },
                        { path: 'tienda/:page', component: TiendaComponent },
                        { path: 'productos', component: ProductsComponent },
                        { path: 'producto/:id', component: ProductsComponent },
                        { path: 'pago', component: PagoComponent },
                        { path: 'pedidos', component: PedidosComponent },
                        { path: 'factura', component: FacturaComponent },

                        { path: 'usuarios', component: UsersComponent },




                      ]
                    },

            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: '**', component: TiendaComponent },

];

// exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);




