import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: any[] = this.obtenerCarrito();
  selectAll: boolean = false;
  mensaje: string =""

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.verificarStock();
  }

  obtenerCarrito(): any[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  verificarStock(): void {
    this.carrito.forEach((producto) => {
      this.productosService
        .listId(producto.idProductos)
        .subscribe((productoDB) => {
          producto.disponible = productoDB.stock > 0;
        });
    });
  }

  todosDisponibles(): boolean {
    return this.carrito.every(
      (producto) => !producto.selected || producto.disponible
    );
  }
  estadoBoton() {
    const seleccionados = this.carrito.filter((producto) => producto.selected);
    if (seleccionados.length === 0) {
      return { color: 'secondary', disabled: true };
    }
    if (seleccionados.every((producto) => producto.disponible)) {
      return { color: 'primary', disabled: false };
    }
    return { color: 'secondary', disabled: true };
  }

  borrarCarrito(): void {
    this.carrito = this.carrito.filter((producto) => !producto.selected);
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.mensaje = "Se eliminaron los productos del carrito"
    this.snackBar.open(this.mensaje, 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  seguirComprando(): void {
    this.router.navigate(['']);
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    this.carrito.forEach((producto) => (producto.selected = this.selectAll));
  }

  pagar(): void {
    const carritoPendiente = this.carrito.filter(
      (producto) => !producto.selected
    );
    this.carrito = this.carrito.filter((producto) => producto.selected);

    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    sessionStorage.setItem(
      'carritoPendiente',
      JSON.stringify(carritoPendiente)
    );
  }
}
