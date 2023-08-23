import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetalleProductosComponent } from './detalle-productos.component';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetalleProductosComponent', () => {
  let component: DetalleProductosComponent;
  let fixture: ComponentFixture<DetalleProductosComponent>;
  
  let formBuilder: FormBuilder;




  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleProductosComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [DatePipe]
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
    component.errorId = false;

    // Llama a la función submitForm
    component.submitForm();

    // Verifica que no se haya calculado la fecha y que se impriman los mensajes esperados
    expect(component.fechaReleaseLabel).toBeUndefined();
  });
});