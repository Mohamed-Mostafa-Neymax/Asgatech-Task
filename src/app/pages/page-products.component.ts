import { Component } from '@angular/core';

import { ProductsComponent } from '@app/components/products/products.component';

@Component({
    selector: 'app-page-products',
    template: '<app-products></app-products>',
    standalone: true,
    imports: [ProductsComponent]
})
export class PageProductsComponent {

}
