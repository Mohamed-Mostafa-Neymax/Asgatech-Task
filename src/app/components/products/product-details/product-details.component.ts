import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TextComponent } from '@app/components/ui/text/text.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    TextComponent,
    NgStyle
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  private dialogRef = inject(MatDialogRef);
  protected dialogData = inject(MAT_DIALOG_DATA);

  closeDialogHandler() {
    this.dialogRef.close();
  }
}
