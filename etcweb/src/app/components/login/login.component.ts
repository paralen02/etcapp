import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""
  role: string = ""
  ngOnInit(): void {
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      sessionStorage.setItem("username", this.username); // Guarda el nombre de usuario
      let roles = this.loginService.showRole(); // Asume que esto devuelve un array de roles
      if (roles.includes('ADMIN') || roles.includes('COMPRADOR') || roles.includes('VENDEDOR')) {
        this.router.navigate(['']);
        sessionStorage.setItem('shouldRefresh', 'true');
      }
    }, error => {
      this.mensaje = "Las credenciales son inválidas. Intente nuevamente."
    });
  }
}
