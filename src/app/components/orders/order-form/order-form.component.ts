import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { RequestsService } from '@app/services/requests.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatRadioModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  private dialogRef = inject(MatDialogRef);
  private dialogData = inject(MAT_DIALOG_DATA);
  private requestsService = inject(RequestsService);
  orderForm!: FormGroup;
  customer!: FormGroup;
  customerName!: FormGroup;
  customerAddress!: FormGroup;

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'customer': new FormGroup({
        'phone': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'name': new FormGroup({
          'firstname': new FormControl(null, Validators.required),
          'lastname': new FormControl(null, Validators.required)
        }),
        'address': new FormGroup({
          'city': new FormControl(null, Validators.required),
          'street': new FormControl(null, Validators.required),
          'number': new FormControl(null, Validators.required),
          'zipCode': new FormControl(null, [Validators.required, Validators.minLength(5)])
        }),
        'paymentMethod': new FormControl('cash'),
        'visaNumber': new FormControl(null)
      })
    });
  }

  paymentValidationHandler(event: any) {
    if (event.value === 'visa')
      (<FormControl>this.orderForm.get('customer.visaNumber')).setValidators([Validators.required, Validators.maxLength(16), Validators.minLength(16)]);
    else
      (<FormControl>this.orderForm.get('customer.visaNumber')).setValidators([Validators.maxLength(16), Validators.minLength(16)]);
      (<FormControl>this.orderForm.get('customer.visaNumber')).updateValueAndValidity();
  }

  addOrderHandler() {
    let order = { id: crypto.randomUUID(), ...this.orderForm.value, products: [this.dialogData.product] }
    order.customer.id = crypto.randomUUID();
    this.requestsService.addOrder(order).subscribe(postRes => this.dialogRef.close());
  }

  closeDialogHandler() {
    this.dialogRef.close();
  }
}
