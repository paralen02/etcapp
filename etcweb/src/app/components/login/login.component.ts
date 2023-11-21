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
      if (this.loginService.showRole() == 'ADMIN') {
        this.router.navigate(['']);
      }
      else if (this.loginService.showRole() == 'COMPRADOR') {
        this.router.navigate(['']);
      }
      else if (this.loginService.showRole() == 'VENDEDOR') {
        this.router.navigate(['']);
      }

    }, error => {
      this.mensaje = "Las credenciales son inválidas. Intente nuevamente."
      this.snackBar.open(this.mensaje, "Aviso",{duration:5000});
    });
  }
}
