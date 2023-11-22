import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  priceRange: number = 0;
  category: string = '';
  starRating = 0;

  constructor(public dialogRef: MatDialogRef<FiltersComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  onPriceRangeChange(event: any): void {
    this.priceRange = event.value;
  }

  onCategoryChange(event: any): void {
    this.category = event.value;
  }
  formatLabel(value: number): string {
    return 'S/' + `${value}`;
  }
}
