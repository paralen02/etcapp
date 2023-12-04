import { ComprasService } from 'src/app/services/compras.service';
import { LoginService } from './../../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CompradoresService } from 'src/app/services/compradores.service';
import { Compradores } from 'src/app/models/compradores';
import { Asesorias } from 'src/app/models/asesorias';
import { AsesoriasService } from 'src/app/services/asesorias.service';

@Component({
  selector: 'app-agendar-asesorias',
  templateUrl: './agendar-asesorias.component.html',
  styleUrls: ['./agendar-asesorias.component.css'],
})
export class AgendarAsesoriasComponent implements OnInit {
  idCompras: number = 0;
  comprador: string = '';
  currentStep: number = 1;
  form!: FormGroup;
  asesoria: Asesorias | null = null;
  isFormSection1Valid = false;
  maxFecha: Date = moment().add(7, 'days').toDate();
  minFecha: Date = moment().add(1, 'days').toDate();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private compradoresService: CompradoresService,
    private comprasService: ComprasService,
    private loginService: LoginService,
    private asesoriasService: AsesoriasService
  ) {}

  ngOnInit(): void {
    this.idCompras = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required],
    });
    this.form.statusChanges.subscribe((status) => {
      this.isFormSection1Valid = status === 'VALID';
    });
    this.getComprador();
  }

  getComprador(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe((data) => {
        if (data) {
          this.comprador = data.nombres;
          this.form.controls['nombres'].setValue(data.nombres);
          this.form.controls['apellidos'].setValue(data.apellidos);
          this.form.controls['correo'].setValue(username);
        }
      });
    }
  }

  onSubmit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe((data) => {
        if (data) {
          this.form.controls['nombres'].setValue(data.nombres);
          this.form.controls['apellidos'].setValue(data.apellidos);
          this.form.controls['correo'].setValue(username);

          if (this.form.valid) {
            let {fecha, hora, motivo } =
              this.form.value;

            this.comprasService
              .listId(this.idCompras)
              .subscribe((compraGuardada) => {
                let asesoria = new Asesorias();
                let fechaDate = moment(fecha).toDate();
                let horaDate = moment(hora, 'HH:mm').toDate();
                asesoria.link =
                  'https://us05web.zoom.us/j/4182832661?pwd=VlFHTDFCa3ZJQ214YmRIb2pjNXo0UT09';
                fechaDate.setHours(horaDate.getHours(), horaDate.getMinutes());
                asesoria.fecha = fechaDate;
                asesoria.motivo = motivo;
                asesoria.compra = compraGuardada;

                this.asesoriasService.insert(asesoria).subscribe(() => {
                  this.snackBar.open('Asesoría agendada con éxito', 'Cerrar', {
                    duration: 5000,
                  });
                  this.asesoria = asesoria;
                  this.currentStep = 2;
                });
              });
          } else {
            this.snackBar.open(
              'Por favor, completa todos los campos requeridos',
              'Cerrar',
              {
                duration: 5000,
              }
            );
          }
        }
      });
    }
  }
}
