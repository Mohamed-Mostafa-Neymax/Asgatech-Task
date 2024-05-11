import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { ProductResponse } from "@app/models/product.model";
import { OrderResponse } from "@app/models/order.model";

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    constructor(private http: HttpClient) { }

    // Products
    getProducts() { return this.http.get<ProductResponse[]>(`${environment.apiUrl}products.json`); }

    // Orders
    getOrders() { return this.http.get<OrderResponse[]>(`${environment.apiUrl}orders.json`); }
    addOrder(order: OrderResponse) { return this.http.post(`${environment.apiUrl}orders.json`, order); }
}