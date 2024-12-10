import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductCreatePageComponent } from './pages/product-create-page/product-create-page.component';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';

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
                component: ProductsPageComponent
            },
            {
                path: 'products/create',
                component: ProductCreatePageComponent
            },
            {
                path: 'products/edit/:productId',
                component: ProductEditPageComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    }
];
