import { ProductResponse } from "./product.model";

interface Customer {
    id: string;
    phone: number;
    email: string;
    paymentMethod: string;
    visaNumber: number;
    name: { firstname: string; lastname: string; };
    address: { city: string; number: number; street: string; zipcode: number; };
}

export interface OrderResponse {
    id: string;
    title: string;
    customer: Customer;
    products: ProductResponse[];
}