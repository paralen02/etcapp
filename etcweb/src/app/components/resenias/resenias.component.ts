import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprasService } from 'src/app/services/compras.service';
import { Resenias } from 'src/app/models/resenias';
import { ReseniasService } from 'src/app/services/resenias.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.component.html',
  styleUrls: ['./resenias.component.css']
})
export class ReseniasComponent implements OnInit{
  idCompras: number = 0;
  compra: any;
  starRating: number = 0;
  form: FormGroup;
  mensaje: string = "";
  fechaResenia!: Date;

  constructor(
    private route: ActivatedRoute,
    private reseniasService: ReseniasService,
    private comprasService: ComprasService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      comentario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idCompras = this.route.snapshot.params['id'];
    this.loadCompraDetails();

    this.reseniasService.getReseniaByCompra(this.idCompras).subscribe(
      (resenia) => {
        if (resenia) {
          // La compra ya tiene una reseña, deshabilita el formulario
          this.form.disable();
          this.mensaje = "Mis reseñas del producto";
          this.fechaResenia = new Date(resenia.fecha);
          const comentarioControl = this.form.get('comentario');
          if (comentarioControl) {
            comentarioControl.setValue(resenia.comentario);
          }
          this.starRating = resenia.calificacion;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadCompraDetails(): void {
    this.comprasService.listId(this.idCompras).subscribe(
      (compra) => {
        this.compra = compra;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submitRating(): void {
    const resenia: Resenias = new Resenias();
    resenia.calificacion = this.starRating;
    resenia.comentario = this.form.value.comentario;
    resenia.compra = this.compra;
    resenia.fecha = new Date();

    this.reseniasService.insert(resenia).subscribe(
      (response) => {
        this.mensaje="Se publicó tu reseña para este producto";
        this.snackBar.open(this.mensaje, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'bottom', // 'top' | 'bottom'
          horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
        });
        this.router.navigate(['/perfil']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
