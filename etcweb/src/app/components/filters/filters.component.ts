import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Categorias } from 'src/app/models/categorias';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  priceRange: number = 0;
  category: number = 0;
  starRating = 0;
  categorias: Categorias[] = [];

  constructor(
    public dialogRef: MatDialogRef<FiltersComponent>,
    public categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriasService.list().subscribe((categorias) => {
      this.categorias = categorias.filter(categoria => categoria.idCategorias !== 1);
    });
  }

  close(): void {
    this.dialogRef.close({
      priceRange: this.priceRange,
      category: this.category,
      starRating: this.starRating,
    });
  }

  applyFilters(): void {
    this.dialogRef.close({
      priceRange: this.priceRange,
      category: this.category,
      starRating: this.starRating,
    });
  }

  resetFilters(): void {
    this.priceRange = 0;
    this.category = 0;
    this.starRating = 0;
  }

  onPriceRangeChange(event: any): void {
    this.priceRange = event.target.value;
  }

  onCategoryChange(event: any): void {
    this.category = event.value;
  }
  formatLabel(value: number): string {
    return 'S/' + `${value}`;
  }
}
