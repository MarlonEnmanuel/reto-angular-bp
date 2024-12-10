import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full',
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products-page/products-page.component'),
            },
            {
                path: 'products/create',
                loadComponent: () => import('./pages/product-create-page/product-create-page.component'),
            },
            {
                path: 'products/edit/:productId',
                loadComponent: () => import('./pages/product-edit-page/product-edit-page.component'),
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component'),
    }
];
