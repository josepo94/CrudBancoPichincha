import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { DetalleProductosComponent } from './componentes/detalle-productos/detalle-productos.component';

const routes: Routes = [
  { path: 'listarProductos', component: ListarProductosComponent },
  { path: 'detalleProductos', component: DetalleProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
