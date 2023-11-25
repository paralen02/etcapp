import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: any[] = this.obtenerCarrito();

  obtenerCarrito(): any[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  borrarCarrito(): void {
    sessionStorage.removeItem('carrito');
    this.carrito = [];
  }

  pagar(): void {
    // Aquí puedes agregar el código para procesar el pago
  }

  seguirComprando(): void {
    this.router.navigate(['']);
  }

  constructor(private router: Router) { }
}
