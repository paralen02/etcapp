import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { PagosService } from 'src/app/services/pagos.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicios } from 'src/app/models/servicios';
import { Pagos } from 'src/app/models/pagos';
import * as moment from 'moment';
import { Operaciones } from 'src/app/models/operaciones';

declare var google: any;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  idVendedores: number = 0;
  form!: FormGroup;
  form2!: FormGroup;
  isFormSection1Valid = false;
  isFormSection2Valid = false;
  maxFecha: Date = moment().add(7, 'days').toDate();
  minFecha: Date = moment().add(1, 'days').toDate();
  currentStep: number = 1;
  center = { lat: -12.0874512, lng: -77.052517 };
  zoom = 8;
  markerPosition = this.center;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  geocoder = new google.maps.Geocoder();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private operacionesService: OperacionesService,
    private pagosService: PagosService,
    private vendedoresService: VendedoresService,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.idVendedores = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.form2 = this.formBuilder.group({
      numeroTarjeta: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      cvv: ['', Validators.required],
      nombreTitular: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue],
    });

    this.form.statusChanges.subscribe((status) => {
      this.isFormSection1Valid = status === 'VALID';
    });

    this.form2.statusChanges.subscribe((status) => {
      this.isFormSection2Valid = status === 'VALID';
    });
    this.aceptar();
  }

  onSubmit(): void {
    if (this.form.valid && this.form2.valid) {
      let { fecha, hora, direccion} = this.form.value;
      let { numeroTarjeta, fechaCaducidad, cvv, nombreTitular, correoElectronico } = this.form2.value;

      let pago = new Pagos();
      pago.numero_tarjeta = numeroTarjeta;
      pago.vencimiento_tarjeta = new Date(fechaCaducidad);
      pago.cvv = cvv;
      pago.titular = nombreTitular;
      pago.correo = correoElectronico;

      this.pagosService.insert(pago).subscribe((pagoInsertado) => {
        let operacion = new Operaciones();
        operacion.monto = 0;
        operacion.fecha = new Date();
        operacion.pago = pagoInsertado;

        this.operacionesService.insert(operacion).subscribe((operacionInsertada) => {
          this.vendedoresService.listId(this.idVendedores).subscribe((vendedor) => {
            let servicios = new Servicios();

            servicios.direccion = direccion;

            let fechaDate = moment(fecha).toDate();
            let horaDate = moment(hora, 'HH:mm').toDate();
            fechaDate.setHours(horaDate.getHours(), horaDate.getMinutes());
            servicios.fecha = fechaDate;

            servicios.operacion = operacionInsertada;
            servicios.vendedor = vendedor;

            this.serviciosService.insert(servicios).subscribe(() => {
              this.snackBar.open('Servicio creado', 'Cerrar', {
                duration: 2000,
              });
              this.router.navigate(['/perfil']);
            });
          });
        });
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  aceptar(): void {
    if (this.currentStep === 1 && this.isFormSection1Valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.isFormSection2Valid) {
      this.onSubmit();
    }
  }

  formatCardNumber(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

    let control = this.form.get('numeroTarjeta');
    if (control) {
      control.setValue(input.value, { emitEvent: false });
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.geocodeLatLng(this.markerPosition);
    }
  }

  geocodeLatLng(position: google.maps.LatLngLiteral) {
    this.geocoder.geocode(
      { location: position },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const direccionControl = this.form.get('direccion');
            if (direccionControl) {
              direccionControl.setValue(results[0].formatted_address);
            }
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
}
