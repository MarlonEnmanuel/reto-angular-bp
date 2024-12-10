import { Component } from '@angular/core';
import { ProductsApiService } from '../../services/products-api.service';
import { Router } from '@angular/router';
import { ProductFormComponent } from "../../components/product-form/product-form.component";
import { Product } from '../../services/products-api.models';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-product-create',
    standalone: true,
    imports: [ProductFormComponent],
    templateUrl: './product-create-page.component.html',
    styleUrl: './product-create-page.component.scss'
})
export default class ProductCreatePageComponent {

    constructor(
        private productsApiService: ProductsApiService,
        private router: Router,
        private alertService: AlertService,
    ) { }

    public handleSendProduct(product: Product) {
        this.productsApiService.createProduct(product).subscribe({
            next: () => {
                this.router.navigate(['/products']);
                this.alertService.success('Producto creado correctamente');
            },
            error: (error) => {
                console.error(error);
                this.alertService.error('Error al crear el producto');
            }
        });
    }
}
