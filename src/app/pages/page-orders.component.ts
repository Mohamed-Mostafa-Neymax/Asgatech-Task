import { Component } from '@angular/core';

import { OrdersComponent } from '@app/components/orders/orders.component';

@Component({
    selector: 'app-page-orders',
    template: '<app-orders></app-orders>',
    standalone: true,
    imports: [OrdersComponent]
})
export class PageOrdersComponent {

}
