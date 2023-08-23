import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarProductosComponent,  } from './listar-productos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CrudProductosService } from 'src/app/servicios/crud-productos.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

let responseProducts = 
    [
        {
            "id": "trj-cre1",
            "name": "TarjetaVA1",
            "description": "Tarjeta de credito con monto superior a 10 millones",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/512px-BBVA_2019.svg.png",
            "date_release": "2023-08-09T00:00:00.000+00:00",
            "date_revision": "2024-08-09T00:00:00.000+00:00"
        },
        {
            "id": "2345",
            "name": "amex card m",
            "description": "Lorem ipsum amex",
            "logo": "https://cdn.icon-icons.com/icons2/2389/PNG/512/american_express_logo_icon_145503.png",
            "date_release": "2023-08-17T00:00:00.000+00:00",
            "date_revision": "2024-08-16T00:00:00.000+00:00"
        }
    
    ]

describe('ListarProductosComponent', () => {
  let component: ListarProductosComponent;
  let fixture: ComponentFixture<ListarProductosComponent>;
  let mockCrudService: jasmine.SpyObj<CrudProductosService>;

  beforeEach(async () => {
    mockCrudService = jasmine.createSpyObj('CrudProductosService', ['obtenerProductos', 'eliminarProductos']);
    
    await TestBed.configureTestingModule({
      declarations: [ListarProductosComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: CrudProductosService, useValue: mockCrudService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductosComponent);
    component = fixture.componentInstance;
    mockCrudService.obtenerProductos.and.returnValue(of([responseProducts])); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display products', () => {
    const mockProducts = responseProducts
    mockCrudService.obtenerProductos.and.returnValue(of(responseProducts));
    component.ngOnInit();
    expect(component.total).toEqual(mockProducts.length);
   // expect(component.filteredData).toEqual(component.paginatedItems);
  });

  it('should delete a product', () => {
    const mockProductId = '123';
    const mockProducts = [
        {
            "id": "trj-cre1",
            "name": "TarjetaVA1",
            "description": "Tarjeta de credito con monto superior a 10 millones",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/512px-BBVA_2019.svg.png",
            "date_release": new Date() ,
            "date_revision":  new Date()
        }
    ];
    component.items = mockProducts;

    mockCrudService.eliminarProductos.and.returnValue(of(null));

    component.deleteItem(mockProductId, 0);

    expect(mockCrudService.eliminarProductos).toHaveBeenCalledWith(mockProductId, 1);
    expect(component.total).toEqual(1);
    expect(component.filteredData.length).toEqual(1);
  });

});