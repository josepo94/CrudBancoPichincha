import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {
  url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
  constructor(public _http: HttpClient) { }

  obtenerProductos(id: number){
   let header = new HttpHeaders({"Content-Type": "application/json; charset=utf-8", 'authorId': id}) 
   return this._http.get<any>(this.url + '/bp/products' ,   {headers : header} )
  }

  eliminarProductos(id: string, authId: number){
    let header = new HttpHeaders({"Content-Type": "application/json; charset=utf-8", 'authorId': authId}) 
    return this._http.delete<any>(this.url + '/bp/products?id='+id ,   {headers : header} )
   }

  verificarID(id: string){
    let header = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"}) 
    return this._http.get<any>(this.url + '/bp/products/verification?id='+id ,   {headers : header} )
   }

   
  acctualizarProducto(id: number, request:  Producto){
    let header = new HttpHeaders({"Content-Type": "application/json; charset=utf-8", 'authorId': id}) 
    return this._http.put<any>(this.url + '/bp/products', request ,   {headers : header} )
   }

   
  crearProducto(id: number, request:  Producto){
    let header = new HttpHeaders({"Content-Type": "application/json; charset=utf-8", 'authorId': id}) 
    return this._http.post<any>(this.url + '/bp/products', request ,   {headers : header} )
   }



}
