import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interface/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CrudProductosService } from 'src/app/servicios/crud-productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit{
  formulario: FormGroup;
  updateForm : boolean = false
  hoy = new Date()
  maxDate : string
  producto :  Producto
 date2 : Date
 errorId : boolean = false
  fechaReleaseLabel : string
  fechaRevisionLabel : string
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,     private _service : CrudProductosService, private _router: Router) {
    this.producto = {id:"",date_release:null,date_revision:null,description:"",logo:"",name:""}
    this.formulario = this.formBuilder.group({
      id: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
      descripcion: ["", [Validators.required,  Validators.minLength(10), Validators.maxLength(200)] ],
      liberacion: ["", Validators.required],
      nombre: ["" , [Validators.required,  Validators.minLength(5), Validators.maxLength(100) ] ],
      logo: ["" , Validators.required],
    });
  }

  submitForm() {

    try{
    if (this.formulario.valid &&  this.errorId == false) {
      this.producto.date_release =  new Date (this.fechaReleaseLabel) 
      let date = this.producto.date_release
      this.date2 = new Date(date);
      this.date2.setDate(this.date2.getDate()+365)
      this.producto.date_revision = this.date2

      this.fechaReleaseLabel = this.datePipe.transform(this.date2,'dd/MM/yyyy')
      this.fechaRevisionLabel = this.datePipe.transform( this.producto.date_release ,'yyyy-MM-dd' )
  
      if (this.updateForm){
        this.actualizar(this.producto)
      }
      else{
        console.log(this.producto)
        this.crearProducto(this.producto)
      }
      
      console.log('Formulario válido, se puede enviar.');
    } else {
      this.formulario.invalid
      console.log('Formulario inválido, faltan datos.');
    }
  }
  catch(e){
  console.log(e)
  }
  }


  reiniciar() {
    this.producto = {id:"",date_release:null,date_revision:null,description:"",logo:"",name:""}
  }

  ngOnInit(): void {
    this.maxDate = this.datePipe.transform( this.hoy,'yyyy-MM-dd')

 if (localStorage.getItem("id")!= null || localStorage.getItem("id")!= undefined ){
  this.producto.id = localStorage.getItem("id")
  this.producto.logo  =  localStorage.getItem("logo")
  this.producto.name  = localStorage.getItem("name")
  this.producto.description = localStorage.getItem("description")
  this.producto.date_revision = new Date ( localStorage.getItem("date_revision"))
  this.producto.date_release = new Date ( localStorage.getItem("date_release"))
  try{
  this.fechaRevisionLabel = this.datePipe.transform(  this.producto.date_revision ,'dd/MM/yyyy' )
  this.fechaReleaseLabel = this.datePipe.transform(  this.producto.date_release ,'yyyy-MM-dd')
} catch(e){
  this.fechaReleaseLabel = null
  this.fechaRevisionLabel = null
}
  localStorage.clear()
  this.updateForm = true
 }else{
  this.updateForm = false
 }
  }


  crearProducto(producto: Producto){
  
    this._service.crearProducto(1, producto).subscribe(
      data =>{

        this._router.navigateByUrl('/listarProductos')
       console.log(data)
      },
      error=>{
       console.log(error)
      }
    )
  }

  actualizar(producto: Producto){
    this._service.acctualizarProducto(1, producto).subscribe(
      data =>{

        this._router.navigateByUrl('/listarProductos')
       console.log(data)
      },
      error=>{
       console.log(error)
      }
    )
  }

  verificarId(){
  
    this._service.verificarID(this.producto.id).subscribe(
      data =>{
    if (data){
        this.errorId = true
  
    }else{
      this.errorId = false 
    }
      },
      error=>{
       console.log(error)
      }
    )
  }


  }


  

