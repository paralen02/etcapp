import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Asesorias } from 'src/app/models/asesorias';
import { AsesoriasService } from 'src/app/services/asesorias.service';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-creaedita-asesorias',
  templateUrl: './creaedita-asesorias.component.html',
  styleUrls: ['./creaedita-asesorias.component.css']
})
export class CreaeditaAsesoriasComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  asesoria: Asesorias = new Asesorias();
  listaCompras: Compras[]=[];
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  fecha = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private aS: AsesoriasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private comprasService: ComprasService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idAsesorias: [''],
      link: ['', Validators.required],
      compra: ['', Validators.required],
      motivo: ['', [Validators.required]],
      fecha: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.asesoria.idAsesorias = this.form.value.idAsesorias;
      this.asesoria.link = this.form.value.link;
      this.asesoria.compra.idCompras = this.form.value.compra;
      this.asesoria.motivo = this.form.value.motivo;
      this.asesoria.fecha = this.form.value.fecha;
      if (this.edicion) {
        this.aS.update(this.asesoria).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.asesoria).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['components/asesorias']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;

  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idAsesorias: new FormControl(data.idAsesorias),
          link: new FormControl(data.link),
          compra: new FormControl(data.compra.idCompras),
          motivo:new FormControl(data.motivo),
          fecha: new FormControl(data.fecha),
        });
      });
    }
  }
}
