import { PagosService } from './../../../services/pagos.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Compradores } from 'src/app/models/compradores';
import { Compras } from 'src/app/models/compras';
import { Envios } from 'src/app/models/envios';
import { Operaciones } from 'src/app/models/operaciones';
import { Pagos } from 'src/app/models/pagos';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos.service';
import { CompradoresService } from 'src/app/services/compradores.service';
import { ComprasService } from 'src/app/services/compras.service';
import { EnviosService } from 'src/app/services/envios.service';
import { LoginService } from 'src/app/services/login.service';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { concatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formSection1: FormGroup = new FormGroup({});
  formSection2: FormGroup = new FormGroup({});
  formSection3: FormGroup = new FormGroup({});
  comprador: Compradores = new Compradores();
  productos: Productos[]=[];
  currentStep = 1;
  isFormSection1Valid = false;
  isFormSection2Valid = false;
  isFormSection3Valid = false;
  maxFecha: Date = moment().add(7, 'days').toDate();
  minFecha: Date = moment().add(1, 'days').toDate();
  fechaEntrega = new FormControl(moment().add(1, 'days').toDate());
  isBuying = false;
  compraGuardada: any;
  distritos = [
    'Cercado de Lima',
    'Ate',
    'Barranco',
    'Breña',
    'Comas',
    'Chorrillos',
    'El Agustino',
    'Jesús María',
    'La Molina',
    'La Victoria',
    'Lince',
    'Magdalena del Mar',
    'Miraflores',
    'Pueblo Libre',
    'Puente Piedra',
    'Rímac',
    'San Isidro',
    'Independencia',
    'San Juan de Miraflores',
    'San Luis',
    'San Martín de Porres',
    'San Miguel',
    'Santiago de Surco',
    'Surquillo',
    'Villa María del Triunfo',
    'San Juan de Lurigancho',
    'Santa Rosa',
    'Los Olivos',
    'San Borja',
    'Villa El Salvador',
    'Santa Anita',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private compradoresService: CompradoresService,
    private loginService: LoginService,
    private operacionesService: OperacionesService,
    private enviosService: EnviosService,
    private comprasService: ComprasService,
    private pagosService: PagosService,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.formSection1 = this.formBuilder.group({
      correo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      celular: ['', Validators.required],
    });

    this.formSection2 = this.formBuilder.group({
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      direccion: ['', Validators.required],
      referencia: ['', Validators.required],
      fechaEntrega: [this.fechaEntrega, Validators.required],
    });

    this.formSection3 = this.formBuilder.group({
      numeroTarjeta: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      cvv: ['', Validators.required],
      nombreTitular: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue],
    });

    this.form = this.formBuilder.group({
      section1: this.formSection1,
      section2: this.formSection2,
      section3: this.formSection3,
    });

    this.formSection1.statusChanges.subscribe((status) => {
      this.isFormSection1Valid = status === 'VALID';
    });

    this.formSection2.statusChanges.subscribe((status) => {
      this.isFormSection2Valid = status === 'VALID';
    });

    this.formSection3.statusChanges.subscribe((status) => {
      this.isFormSection3Valid = status === 'VALID';
    });

    this.formSection2.controls['departamento'].setValue('Lima');
    this.formSection2.controls['provincia'].setValue('Lima');
    this.formSection2.controls['departamento'].disable();
    this.formSection2.controls['provincia'].disable();

    this.getComprador();
  }

  getComprador(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe(
        (data) => {
          if (data && data.user) {
            this.comprador = data;
            this.formSection1.patchValue({
              correo: data.user.username,
              nombres: data.nombres,
              apellidos: data.apellidos,
              dni: data.dni,
              celular: data.celular,
            });
            this.formSection3.patchValue({
              correoElectronico: data.user.username,
              nombreTitular:
                data.nombres.toString() + ' ' + data.apellidos.toString(),
            });
            // console.log(this.comprador);
          } else {
            // console.log('data or data.user is undefined');
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    }
  }

  aceptar(): void {
    if (this.currentStep === 1 && this.isFormSection1Valid) {
      this.nextStep();
    } else if (this.currentStep === 2 && this.isFormSection2Valid) {
      this.nextStep();
    } else if (this.currentStep === 3 && this.isFormSection3Valid) {
      this.compraProductos();
      this.nextStep();
    }
  }

  compraProductos(): void {
    this.isBuying = true;

    // Crear el objeto Pagos
    const pago = new Pagos();
    pago.correo = this.loginService.getUsername();
    pago.cvv = this.formSection3.value.cvv;
    pago.numero_tarjeta = this.formSection3.value.numeroTarjeta;
    pago.vencimiento_tarjeta = this.formSection3.value.fechaCaducidad;
    pago.titular = this.formSection3.value.nombreTitular;

    // Crear el objeto Envios
    const envio = new Envios();
    envio.fecha_compra = new Date();
    envio.fecha_envio = this.formSection2.value.fechaEntrega;
    envio.departamento = this.formSection2.value.departamento;
    envio.provincia = this.formSection2.value.provincia;
    envio.distrito = this.formSection2.value.distrito;
    envio.direccion = this.formSection2.value.direccion;
    envio.referencia = this.formSection2.value.referencia;

    // Crear el objeto Operaciones
    const operacion = new Operaciones();
    operacion.fecha = new Date();
    operacion.pago = pago;

    // Obtener el objeto Compradores del servicio
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe(
        (data) => {
          if (data && data.user) {
            const comprador = data;

            // Primero, guardar el pago en la base de datos
            this.pagosService.insert(pago).subscribe((pagoGuardado) => {
              // Una vez que el pago se ha guardado, asignarlo a la operación
              operacion.pago = pagoGuardado;

              // Luego, guardar el envío y la operación en paralelo
              forkJoin({
                envioGuardado: this.enviosService.insert(envio),
                operacionGuardada: this.operacionesService.insert(operacion),
              }).subscribe((results) => {
                // Crear el objeto Compras
                const compra = new Compras();
                compra.fecha = new Date();
                compra.operacion = results.operacionGuardada;
                compra.comprador = comprador;
                compra.envio = results.envioGuardado;

                // Obtener las publicaciones del carrito
                const carritoData = sessionStorage.getItem('carrito');
                if (carritoData !== null) {
                  const carrito = JSON.parse(carritoData);

                  // Iterar sobre cada item en el carrito
                  carrito.forEach((item: any) => {
                    const publicacionId = item.idPublicacion;

                    // Obtener la publicación de la base de datos
                    this.publicacionesService
                    .listId(publicacionId)
                    .subscribe((publicacion) => {
                      compra.publicacion = publicacion;

                      // Guardar la compra en la base de datos
                      this.comprasService.insert(compra).subscribe((compraGuardada) => {
                        this.compraGuardada=compraGuardada
                        // console.log('La compra consiste en: ', compraGuardada);

                        // Obtener el producto de la base de datos
                        this.productosService.listId(publicacion.producto.idProductos).subscribe((producto) => {
                          if (producto) {
                            // Restar una unidad al stock
                            producto.stock -= 1;
                            operacion.monto = producto.precio;

                            // Actualizar el producto en la base de datos
                            this.productosService.update(producto).subscribe(() => {
                              this.operacionesService.update(operacion).subscribe(() => {
                              });
                            });
                          } else {
                          }
                        });
                      });
                    });
                  });
                } else {
                  // console.error(
                  //   'No se encontró ninguna publicación en sessionStorage.'
                  // );
                }
              });
            });
          } else {
            // console.log('No se ha encontrado el usuario');
          }
          this.isBuying = false;
        },
        (error) => {
          // console.log(error);
          this.isBuying = false;
        }
      );
    }
  }

  nextStep(): void {
    this.currentStep++;
    const progressBar = document.getElementById('progressBar') as HTMLElement;
    progressBar.style.width = `${(this.currentStep / 3) * 100}%`;

    if (this.currentStep >= 1) {
      const progressCircle1 = document.getElementById(
        'progressCircle1'
      ) as HTMLElement;
      progressCircle1.style.backgroundColor = '#ff914d';
    }
    if (this.currentStep >= 2) {
      const progressCircle2 = document.getElementById(
        'progressCircle2'
      ) as HTMLElement;
      progressCircle2.style.backgroundColor = '#ff914d';
    }
    if (this.currentStep >= 3) {
      const progressCircle3 = document.getElementById(
        'progressCircle3'
      ) as HTMLElement;
      progressCircle3.style.backgroundColor = '#ff914d';
    }
    this.updateProgressBar();
  }
  setStep(step: number): void {
    if ((step === 1 && this.isFormSection1Valid) ||
        (step === 2 && this.isFormSection2Valid) ||
        (step === 3 && this.isFormSection3Valid)) {
      this.currentStep = step;
      this.updateProgressBar();
    }
  }

  updateProgressBar(): void {
    const progressBar = document.getElementById('progressBar') as HTMLElement;
    progressBar.style.width = `${(this.currentStep / 3) * 100}%`;

    const progressCircle1 = document.getElementById('progressCircle1') as HTMLElement;
    const progressCircle2 = document.getElementById('progressCircle2') as HTMLElement;
    const progressCircle3 = document.getElementById('progressCircle3') as HTMLElement;

    progressCircle1.style.backgroundColor = this.currentStep >= 1 ? '#ff914d' : '';
    progressCircle2.style.backgroundColor = this.currentStep >= 2 ? '#ff914d' : '';
    progressCircle3.style.backgroundColor = this.currentStep >= 3 ? '#ff914d' : '';
  }
}
