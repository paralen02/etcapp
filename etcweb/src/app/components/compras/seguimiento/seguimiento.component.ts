import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  idCompras: number = 0;
  compra: any;
  currentStep: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comprasService: ComprasService
  ) {}

  ngOnInit(): void {
    this.idCompras = this.route.snapshot.params['id'];
    this.loadCompraDetails();
  }

  loadCompraDetails(): void {
    this.comprasService.listId(this.idCompras).subscribe(
      (compra) => {
        this.compra = compra;

        // Verifica si hay información de fecha y no es null
        if (this.compra.fecha) {
          this.currentStep++;
        }
        if (this.compra.envio && this.compra.envio.fecha_envio) {
          this.currentStep++;
        }
        if (this.compra.envio && this.compra.envio.fecha_entrega) {
          this.currentStep++;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  goToReviews():void{
    if (this.compra && this.compra.idCompras) {
      this.router.navigate(['/resenias', this.compra.idCompras]);
    }
  }
  getProgressBarWidth(): string {
    return `${(this.currentStep / 3) * 100}%`;
  }
  getCirclePosition(circleNumber: number): string {
    return `${(circleNumber / 3) * 100}%`;
  }
}
