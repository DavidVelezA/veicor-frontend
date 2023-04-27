import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PagoComponent } from './components/pago/pago.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacturaComponent } from './components/factura/factura.component';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    InicioComponent,
    PagoComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    ProductsComponent,
    UsersComponent,
    PedidosComponent,
    FacturaComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
