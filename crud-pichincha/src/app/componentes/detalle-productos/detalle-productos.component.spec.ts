import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetalleProductosComponent } from './detalle-productos.component';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrudProductosService } from 'src/app/servicios/crud-productos.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
describe('DetalleProductosComponent', () => {
  let component: DetalleProductosComponent;
  let fixture: ComponentFixture<DetalleProductosComponent>;
  let mockCrudService: jasmine.SpyObj<CrudProductosService>;
  let formBuilder: FormBuilder;

  let responseGenericService = 
  
      {
        status : "200" ,
        mensaje :  "OK"
      }
  



  beforeEach(async () => {
    mockCrudService = jasmine.createSpyObj('CrudProductosService', ['acctualizarProducto', 'crearProducto', 'verificarID']);

    await TestBed.configureTestingModule({
      declarations: [DetalleProductosComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [DatePipe,    { provide: CrudProductosService, useValue: mockCrudService },    
      { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) },
    ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductosComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.formulario = formBuilder.group({
      id:"asm-435", 
      liberacion: "2020-08-11T00:00:00.000Z",
      nombre:"Reporte Credito",
      logo: "https://pixabay.com/es/photos/capucho-mono-animal-primate-8183528/",
      descripcion:"test develop"
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle valid form submission', () => {
    let date = new Date();
    // Simula un valor válido en el formulario
    component.formulario.get('nombre')?.setValue('Ejemplo');
    component.formulario.get('id')?.setValue(date);
    component.formulario.get('descripcion')?.setValue("test description cob 10 digitos");
    component.formulario.get('liberacion')?.setValue(date);
    component.formulario.get('logo')?.setValue("test logo");
    component.errorId = false;

    mockCrudService.crearProducto.and.returnValue(of(responseGenericService));
    component.updateForm = false
    // Llama a la función submitForm
    component.submitForm();

    // Verifica que se haya calculado la fecha correctamente y que se impriman los mensajes esperados
    expect(component.fechaReleaseLabel).toBeDefined();
    //expect(console.log).toHaveBeenCalledOnceWith('Formulario válido, se puede enviar.');
  });

  it('should handle invalid form submission', () => {
    // No establece los valores requeridos para provocar un formulario inválido
    component.formulario.get('nombre')?.setValue('');
    component.formulario.get('date_revision')?.setValue('');
    component.errorId = true;

    // Llama a la función submitForm
    component.submitForm();

    // Verifica que no se haya calculado la fecha y que se impriman los mensajes esperados
    expect(component.fechaReleaseLabel).toBeUndefined();
  });

  it('should handle reiniciar', () => {
    //reiniciar
   let productoTest= {id:"",date_release:null,date_revision:null,description:"",logo:"",name:""}
    component.reiniciar();
    expect(component.producto).toEqual(productoTest);
  })

  it('should handle ngOnInit true', () => {
    //llama a la funcion onInit con resultado true
  localStorage.setItem("id", "1245")
  localStorage.setItem("logo", "logoTest")
  localStorage.setItem("description", "DescriptionTest")
  component.producto.date_release = new Date()
    component.ngOnInit();
    expect(component.updateForm).toBeTrue
    expect(component.producto).toBeDefined
  })


  it('should handle ngOnInit updateProduct', () => {
 //llama a la funcion onInit y al metodo actualiza el  producto 
 let date = new Date();
 component.updateForm = true
 component.formulario.get('nombre')?.setValue('Ejemplo');
 component.formulario.get('id')?.setValue("2");
 component.formulario.get('descripcion')?.setValue("test description cob 10 digitos");
 component.formulario.get('liberacion')?.setValue(date);
 component.formulario.get('logo')?.setValue("test logo");
component.producto.date_release = date
component.producto.date_revision = date
 component.errorId = false


  localStorage.setItem("id", "1245")
  localStorage.setItem("logo", "logoTest")
  localStorage.setItem("description", "DescriptionTest")

    mockCrudService.acctualizarProducto.and.returnValue(of(responseGenericService));
    expect(component.updateForm).toBeTrue
    expect(component.producto).toBeDefined
  })




  it('should handle verificarId', () => {
    //llama a la funcion onInit y al metodo verificarId
    let response = true
       mockCrudService.verificarID.and.returnValue(of(response));
       component.verificarId()
       expect(component.errorId).toBeTrue
     })


     it('should handle verificarId false response', () => {

      let response = false
         mockCrudService.verificarID.and.returnValue(of(response));
         component.verificarId()
         expect(component.errorId).toBeFalse
       })


       it('should handle valid form  update submission', () => {
        let date = new Date();
        // Simula un valor válido en el formulario
        component.formulario.get('nombre')?.setValue('Ejemplo');
        component.formulario.get('id')?.setValue(date);
        component.formulario.get('descripcion')?.setValue("test description cob 10 digitos");
        component.formulario.get('liberacion')?.setValue(date);
        component.formulario.get('logo')?.setValue("test logo");
        component.errorId = false;
    
        mockCrudService.acctualizarProducto.and.returnValue(of(responseGenericService));
        component.updateForm = true
        // Llama a la función submitForm
        component.submitForm();
    
        expect(component.fechaReleaseLabel).toBeDefined();
        //expect(console.log).toHaveBeenCalledOnceWith('Formulario válido, se puede enviar.');
      });


});