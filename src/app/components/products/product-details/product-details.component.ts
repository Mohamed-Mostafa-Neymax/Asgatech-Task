import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private dialogRef = inject(MatDialogRef);
  private dialogData = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    console.log(this.dialogData);
  }

  closeDialogHandler() {
    this.dialogRef.close();
  }
}
