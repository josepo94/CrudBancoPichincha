import { Component , OnInit} from '@angular/core';
import { Producto } from 'src/app/interface/producto';
import { CrudProductosService } from 'src/app/servicios/crud-productos.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  items: Producto [] = []
  filteredData: any[] = []; // Datos filtrados
  searchTerm: string = ''; // Término de búsqueda

  posAux = 0
  itemsPerPage = 5;
  isDropdownOpen = [];
  selectedOption: any; // Variable para almacenar la opción seleccionada
  options = [
    { value: 1, label: '1' },
    { value: 3, label: '3' },
    { value: 5, label: '5' }
  ];

  constructor (
    private _service : CrudProductosService
  ){

  }

  get paginatedItems(): Producto[] {
    const startIndex = 0 * this.itemsPerPage;
    this.filteredData = this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
    console.log(this.filteredData)
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

 


  showOptions = false;

  

  toggleDropdown(cont : number) {
    if (!this.isDropdownOpen[cont] ||   this.isDropdownOpen[cont] == undefined){
    this.isDropdownOpen[cont] = true
  }else{
    this.isDropdownOpen[cont] = false
  } 
  }

  editItem() {
    // Lógica para editar el elemento
    console.log('Editar elemento');
  }

  deleteItem() {
    // Lógica para eliminar el elemento
    console.log('Eliminar elemento');
  }
  
  ngOnInit(): void {
  this._service.obtenerProductos(1).subscribe(
    data =>{
     this.items = data
     this.filteredData = this.paginatedItems
    },
    error=>{
     console.log(error)
    }
  )
  }


   applyFilter(): void {
    // Filtrar los datos en función del término de búsqueda
    this.filteredData = this.paginatedItems.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  showDetails(): void {
console.log(this.itemsPerPage)
  }

}
