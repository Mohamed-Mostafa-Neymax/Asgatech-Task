import { Component } from '@angular/core';

import { OrderDetailsComponent } from '@app/components/orders/order-details/order-details.component';

@Component({
    selector: 'app-page-order-details',
    template: '<app-order-details></app-order-details>',
    standalone: true,
    imports: [OrderDetailsComponent]
})
export class PageOrderDetailsComponent {

}
