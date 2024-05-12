import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
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
import { OrderResponse } from '@app/models/order.model';

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
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  requestsService = inject(RequestsService);
  private dialog = inject(MatDialog);
  products = toSignal(this.requestsService.getProducts(), { initialValue: [] });
  ordersPureResponse = signal<any>(null);
  ordersList = signal<OrderResponse[]>([]);
  selectedOrder = signal<{order_id: string; title: string; product_id: number | null}>({order_id: '', title: '', product_id: null});
  ordersDropdown = computed(() => {
    const orders: { id: string; title: string; }[] = [];
    for (let order of this.ordersList())
      orders.push({id: order.id, title: order.title});
    return orders;
  });
  
  ngOnInit(): void {
    this.getOrdersDropdown();
  }

  // Get Orders Dropdown
  getOrdersDropdown() {
    this.requestsService.getOrders()
      .pipe(
        tap(
          ordersRes => {
            this.ordersPureResponse.set(ordersRes);
            return ordersRes;
          }
        ),
        map(
            ordersRes => {
              const orders: OrderResponse[] = [];
              for (let orderKey in ordersRes) 
                  orders.push(ordersRes[orderKey]);
              return orders
            }
        ),
      ).subscribe(ordersRes => this.ordersList.set(ordersRes));
  }

  // Select Order
  selectOrderHandler(event: MatSelectChange) {
    this.selectedOrder.set(event.value);
  }

  // Product Details
  showProductdetailsHandler(product: ProductResponse) {
    this.dialog.open(ProductDetailsComponent, { data: { product } });
  }

  // Add Product
  addProductHandler() {
    const product = this.products().find(product => product.id === this.selectedOrder().product_id);
    this.ordersPureResponse.update(prevState => {
      for (let orderKey in prevState) {
        if (prevState[orderKey].id === this.selectedOrder().order_id) {
          prevState[orderKey].products = 
            prevState[orderKey].products.find((product: any) => product.id === this.selectedOrder().product_id) ? 
              prevState[orderKey].products : 
              [...prevState[orderKey].products, product];
        }
      }
      return prevState;
    });
    this.requestsService.addProductToOrder(this.ordersPureResponse())
      .subscribe(res => this.selectedOrder.set({order_id: '', title: '', product_id: null})); // Reset the selection
  }

  // New Order
  AddToNewOrder(product: ProductResponse) {
    const dialogRef = this.dialog.open(OrderFormComponent, { data: { product } });
    dialogRef.afterClosed().subscribe(result => this.getOrdersDropdown());
  }

  // Truncate Text Helper
  truncateText(text: string) {
    return text.length > 50 ? `${text.substring(0, 70)}...` : text;
  }
}
