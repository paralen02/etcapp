import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { CompradoresService } from 'src/app/services/compradores.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  role: string = '';
  username: string = '';
  comprador: string = '';

  constructor(
    private loginService: LoginService,
    public router: Router,
    private searchService: SearchService,
    private compradoresService: CompradoresService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/' && sessionStorage.getItem('shouldRefresh') === 'true') {
        sessionStorage.removeItem('shouldRefresh');
        location.reload();
      }
    });
    this.getComprador();
  }

  isHomePage(): boolean {
    return this.router.isActive('/', true);
  }

  cerrar() {
    this.router.navigate(['']);
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.getUsername();

    return this.loginService.verificar();
  }
  validarRol() {
    if (
      this.role.includes('ADMIN') ||
      this.role.includes('COMPRADOR') ||
      this.role.includes('VENDEDOR')
    ) {
      return true;
    } else {
      return false;
    }
  }

  onSearch(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchService.emitSearch(searchValue);
  }

  obtenerNumeroDeItemsEnCarrito(): number {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito).length : 0;
  }

  getComprador(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe((data) => {
        if (data) {
          this.comprador = data.nombres;
        }
      });
    }
  }
}
