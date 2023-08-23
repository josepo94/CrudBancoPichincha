import { Component , OnInit} from '@angular/core';
import { Producto } from 'src/app/interface/producto';
import { CrudProductosService } from 'src/app/servicios/crud-productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  items: Producto [] = []
  filteredData: any[] = []; // Datos filtrados
  searchTerm: string = ''; // Término de búsqueda

  total = 0
  itemsPerPage = 5;
  isDropdownOpen = [];

  options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' }
  ];

  constructor (
    private _service : CrudProductosService , private _router: Router
  ){

  }

  get paginatedItems(): Producto[] {
    const startIndex = 0 * this.itemsPerPage;
    this.filteredData = this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
    console.log(this.filteredData)
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }


  toggleDropdown(cont : number) {
    if (!this.isDropdownOpen[cont] ||   this.isDropdownOpen[cont] == undefined){
    this.isDropdownOpen[cont] = true
  }else{
    this.isDropdownOpen[cont] = false
  } 
  }

  editItem(producto) {
    localStorage.setItem("id", producto.id )
    localStorage.setItem("logo", producto.logo )
    localStorage.setItem("name", producto.name )
    localStorage.setItem("description", producto.description )
    localStorage.setItem("date_revision", producto.date_revision )
    localStorage.setItem("date_release", producto.date_release )

    this._router.navigateByUrl('/detalleProductos')
  }


  
  ngOnInit(): void {
 this.obtenerProductos();
  }


  obtenerProductos(){
    this._service.obtenerProductos(1).subscribe(
      data =>{
       this.items = data
       this.total = this.items.length
       this.filteredData = this.paginatedItems
      },
      error=>{
       console.log(error)
      }
    )
  }

  deleteItem(idProducto : string, cont: number) {
    this.filteredData.splice(cont,1)
    this.total = this.total-1
      this._service.eliminarProductos(idProducto, 1).subscribe(
        data =>{
                   this.ngOnInit();
        },
        error=>{
         console.log(error)
        }
      )
      this.toggleDropdown(cont)
  }

  agregar(){
    this._router.navigateByUrl('/detalleProductos')
  }





   applyFilter(): void {
    // Filtrar los datos en función del término de búsqueda
    this.filteredData = this.paginatedItems.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


}
