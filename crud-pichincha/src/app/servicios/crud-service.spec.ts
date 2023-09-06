
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudProductosService } from './crud-productos.service';
import { Producto } from '../interface/producto';

describe('CrudProductosService', () => {
  let service: CrudProductosService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudProductosService],
    });

    service = TestBed.inject(CrudProductosService);
    httpTestingController = TestBed.inject(HttpTestingController);

    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería obtener productos', () => {
    const id = 1;
    const mockResponse = [
        {
            id: "tu-12341",
            name: "Random Card",
            description: "To make new things",
            logo: "https://i.ytimg.com/vi/oruCimr-1uI/maxresdefault.jpg",
            date_release: "2023-08-23T00:00:00.000+00:00",
            date_revision: "2024-08-23T00:00:00.000+00:00"
        }
    ]

    service.obtenerProductos(id).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((req) => req.url === `${service.url}/bp/products`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('authorId')).toEqual(id.toString());

    req.flush(mockResponse);
    service.obtenerProductos(1)
  });

  it('debería eliminar productos', () => {
    const id = 'productoId';
    const authId = 1;
    const mockResponse = [
        {
            id: "tu-12341",
            name: "Random Card",
            description: "To make new things",
            logo: "https://i.ytimg.com/vi/oruCimr-1uI/maxresdefault.jpg",
            date_release: "2023-08-23T00:00:00.000+00:00",
            date_revision: "2024-08-23T00:00:00.000+00:00"
        }
    ]

    service.eliminarProductos(id, authId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((req) => req.url === `${service.url}/bp/products?id=${id}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.headers.get('authorId')).toEqual(authId.toString());

    req.flush(mockResponse);
  });

  it('debería verificar el ID de productos', () => {
    const id = 'productoId';
    const mockResponse = false

    service.verificarID(id).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((req) => req.url === `${service.url}/bp/products/verification?id=${id}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('debería actualizar un producto', () => {
    const id = 1;
    let date_release = new Date();
    let date_revision = new Date();
    const request: Producto = {
        id: "fffff",
        date_release: date_release,
        date_revision: date_revision,
        description: "wqeqwewqewq",
        logo: "ewqewq",
        name: "eqwww"
      }
    const mockResponse =   {
        status : "ok",
        repuesta : "actualizado"
      }

    service.acctualizarProducto(id, request).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((req) => req.url === `${service.url}/bp/products`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('authorId')).toEqual(id.toString());
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });

  it('debería crear un producto', () => {
    const id = 1;
    const date = new Date()
    const request: Producto =   {     
        id : null , 
        name: "Random Card",
        description: "To make new things",
        logo: "https://i.ytimg.com/vi/oruCimr-1uI/maxresdefault.jpg",
        date_release: date,
        date_revision: date
    }
    const mockResponse =   {
        status : "ok",
        repuesta : "creado"
      }

    service.crearProducto(id, request).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((req) => req.url === `${service.url}/bp/products`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('authorId')).toEqual(id.toString());
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });
});

