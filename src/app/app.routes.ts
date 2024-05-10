import { Routes } from '@angular/router';

export const routes: Routes = [
    // Static Routes
    { path: '', pathMatch: 'full', loadComponent: () => import('./pages/page-products.component').then(comp => comp.PageProductsComponent) },
    { path: 'orders', loadComponent: () => import('./pages/page-orders.component').then(comp => comp.PageOrdersComponent) },
    { path: 'page-not-found', loadComponent: () => import('./pages/page-not-found.component').then(comp => comp.PageNotFoundComponent) },
    
    // Dynamic Routes
    { path: 'orders/:order-id', loadComponent: () => import('./pages/page-order-details.component').then(comp => comp.PageOrderDetailsComponent) },
    { path: '**', redirectTo: '/page-not-found' }
];
