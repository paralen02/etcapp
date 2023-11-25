import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { SignupService } from 'src/app/services/signup.service';
import { Compradores } from 'src/app/models/compradores';

@Component({
  selector: 'app-signup-comprador',
  templateUrl: './signup-comprador.component.html',
  styleUrls: ['./signup-comprador.component.css'],
})
export class SignupCompradorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  mensaje: string = '';

  constructor(
    private signupService: SignupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  signup() {
    if (this.form.valid) {
      // Crear un objeto Users con los datos del formulario
      const user: Users = {
        id: 0,
        username: this.form.value.username,
        password: this.form.value.password,
        enabled: true,
      };

      // Crear un objeto Compradores con los datos del formulario
      const comprador: Compradores = {
        idCompradores: 0,
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        celular: this.form.value.celular,
        dni: this.form.value.dni,
        user: user,
      };

      this.signupService.signupAndLogin(user, comprador, '').subscribe(
        () => {
          this.mensaje = 'Usuario y comprador registrados con éxito';
          this.snackBar.open(this.mensaje, 'Aviso', { duration: 4000 });
          this.router.navigate([''], {
            relativeTo: this.route,
          });
        },
        (error) => {
          this.mensaje = 'Hubo un error al registrar al usuario y comprador';
          this.snackBar.open(this.mensaje, 'Aviso', { duration: 4000 });
        }
      );
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
}
