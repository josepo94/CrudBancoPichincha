import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interface/producto';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit{
  items: Producto [] = []

  currentPage = 1;
  itemsPerPage = 5;

  get displayedItems(): Producto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  ngOnInit(): void {
    // Aquí cargarías tus datos desde algún servicio o fuente de datos
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }


  
}
