import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleProductosComponent } from './componentes/detalle-productos/detalle-productos.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { PaginadorComponent } from './componentes/paginador/paginador.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DetalleProductosComponent,
    ListarProductosComponent,
    TablaComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
