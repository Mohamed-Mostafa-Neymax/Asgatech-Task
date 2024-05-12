import { Component, OnInit, inject, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TextComponent } from '@app/components/ui/text/text.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequestsService } from '@app/services/requests.service';
import { OrderResponse } from '@app/models/order.model';
import { ButtonComponent } from '@app/components/ui/button/button.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TextComponent,
    NgStyle,
    ButtonComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private requestsService = inject(RequestsService);
  ordersList = signal<OrderResponse[]>([]);

  ngOnInit(): void {
    this.requestsService.getOrders()
        .pipe(
            map(
                ordersRes => {
                  const orders: OrderResponse[] = [];
                  for (let orderKey in ordersRes) 
                      orders.push({...ordersRes[orderKey], products: ordersRes[orderKey].products.map(product => ({...product, quantity: 1}))});
                  return orders;
                }
            )
        ).subscribe(ordersRes => {
          this.ordersList.set(ordersRes)
        })
  }

  calculateTotalPrice(order: OrderResponse) {
    return order.products
      .map(product => (
        product.quantity ? product.price * product.quantity : product.price) - 
        ((product.quantity ? product.price * product.quantity : product.price) * 
        (product.quantity ? product.discountPercentage * product.quantity : product.discountPercentage) / 100))
      .reduce((a, b) => a + b)
      .toFixed(2);
  }

  quantityHandler(qtyType: string, order_id: string, product_id: number) {
    this.ordersList.update(prevState => {
      const orderIndex = prevState.findIndex(order => order.id === order_id);
      const productIndex = prevState[orderIndex].products.findIndex(product => product.id === product_id);
      if (qtyType === 'decrease' && prevState[orderIndex].products[productIndex].quantity > 1) 
        prevState[orderIndex].products[productIndex].quantity -= 1;
      if (qtyType === 'increase' && prevState[orderIndex].products[productIndex].quantity > 0)
        prevState[orderIndex].products[productIndex].quantity += 1;
      return prevState;
    });
  }

  PlaceOrderHandler() {
    console.log('Placed Order !!!');
  }
}
