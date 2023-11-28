import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { Vendedores } from 'src/app/models/vendedores';
import { CompradoresService } from 'src/app/services/compradores.service';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-signup-vendedor',
  templateUrl: './signup-vendedor.component.html',
  styleUrls: ['./signup-vendedor.component.css'],
})
export class SignupVendedorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
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
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private compradoresService: CompradoresService,
    private vendedoresService: VendedoresService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
    });
      // Obtén el nombre de usuario del usuario actualmente logueado
  let username = this.loginService.getUsername();

  // Usa el nombre de usuario para obtener la información del Comprador
  this.compradoresService.findByUsername(username).subscribe(comprador => {
    // Establece los valores de los campos del formulario
    this.form.controls['username'].setValue(comprador.user.username);
    this.form.controls['password'].setValue(comprador.user.password);
    this.form.controls['nombres'].setValue(comprador.nombres);
    this.form.controls['apellidos'].setValue(comprador.apellidos);
    this.form.controls['celular'].setValue(comprador.celular);
    this.form.controls['dni'].setValue(comprador.dni);

    // Deshabilita los campos del formulario
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['nombres'].disable();
    this.form.controls['apellidos'].disable();
    this.form.controls['celular'].disable();
    this.form.controls['dni'].disable();
  });
  }

  signup() {
    if (this.form.valid) {
      // Obtén el nombre de usuario del usuario actualmente logueado
      let username = this.loginService.getUsername();

      // Usa el nombre de usuario para obtener la información del Comprador
      this.compradoresService
        .findByUsername(username)
        .subscribe((comprador) => {
          // Crear un objeto Vendedores con los datos del formulario y la información del Comprador
          const vendedor: Vendedores = {
            idVendedores: 0,
            direccion: this.form.value.direccion,
            distrito: this.form.value.distrito,
            user: comprador.user,
          };

          // Insertar el nuevo Vendedor en la base de datos
          this.vendedoresService.insert(vendedor).subscribe(
            () => {
              // Crear un objeto Role con el rol "VENDEDOR" y la información del Comprador
              const role: Role = {
                id: 0,
                rol: 'VENDEDOR',
                user: comprador.user,
              };

              // Insertar el nuevo Role en la base de datos
              this.roleService.insert(role).subscribe(
                () => {
                  this.mensaje="¡Felicidades! Ahora es un vendedor";
                  this.snackBar.open(this.mensaje, 'Cerrar', {
                    duration: 5000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'left', // 'start' | 'center' | 'end' | 'left' | 'right'
                  });
                },
                (error) => {
                  // Manejar el error de la operación aquí
                }
              );
            },
            (error) => {
              // Manejar el error de la operación aquí
            }
          );
        });
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
}
