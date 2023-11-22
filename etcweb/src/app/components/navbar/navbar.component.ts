import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role:string="";
  username:string="";

  constructor(private loginService: LoginService, public router: Router, private searchService: SearchService) {
  }

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.getUsername();

    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'ADMIN' || this.role == 'COMPRADOR'|| this.role == 'VENDEDOR') {
      return true;
    } else {
      return false;
    }
  }

  onSearch(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchService.emitSearch(searchValue);
  }
}
