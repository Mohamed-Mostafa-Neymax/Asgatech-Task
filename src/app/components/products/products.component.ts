import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { TextComponent } from '@app/components/ui/text/text.component';
import { RequestsService } from '@app/services/requests.service';
import { StopPropagation } from '@app/directives/stop-propagation.directive';
import { OrderFormComponent } from '@app/components/orders/order-form/order-form.component';
import { ProductResponse } from '@app/models/product.model';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TextComponent,
    RouterModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    StopPropagation
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  requestsService = inject(RequestsService);
  private dialog = inject(MatDialog);
  products = toSignal(
    this.requestsService.getProducts().pipe(map(products => products.map(product => ({...product, description: this.truncateText(product.description)})))),
    { initialValue: [] }
  );
  ordersList = toSignal(
    this.requestsService.getOrders().pipe(map(ordersRes => {
      const orders: string[] = [];
      for (let orderKey in ordersRes)
        orders.push(ordersRes[orderKey].title);
      return orders;
    })),
    { initialValue: []}
  );
  selectedOrders = signal([]);
  
  // Select Multiple Orders
  selectOrderHandler(event: MatSelectChange) {
    console.log(event.value);
    this.selectedOrders.set(event.value);
    console.log('Select Multiple Orders !!!');
  }

  // Product Details
  showProductdetailsHandler(product: ProductResponse) {
    console.log('Product Details !!!');
    this.dialog.open(ProductDetailsComponent, { data: { product } });
  }

  // New Order
  AddToNewOrder(product: ProductResponse) {
    console.log('Create New Order !!!');
    const dialogRef = this.dialog.open(OrderFormComponent, { data: { product } });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  truncateText(text: string) {
    return text.length > 50 ? `${text.substring(0, 70)}...` : text;
  }
}
