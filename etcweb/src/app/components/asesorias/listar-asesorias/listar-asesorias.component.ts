import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Asesorias } from 'src/app/models/asesorias';
import { AsesoriasService } from 'src/app/services/asesorias.service';

@Component({
  selector: 'app-listar-asesorias',
  templateUrl: './listar-asesorias.component.html',
  styleUrls: ['./listar-asesorias.component.css']
})
export class ListarAsesoriasComponent implements OnInit{
  dataSource: MatTableDataSource<Asesorias> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'link', 'fecha', 'motivo', 'compra','accion01','accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: AsesoriasService) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
