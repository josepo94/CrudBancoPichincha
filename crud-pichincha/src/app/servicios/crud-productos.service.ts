import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

}
