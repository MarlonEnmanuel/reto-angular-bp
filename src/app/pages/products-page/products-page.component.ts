import { Component, computed, signal } from '@angular/core';
import { ProductsApiService } from '../../services/products-api.service';
import { Product } from '../../services/products-api.models';
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [
        ProductListComponent,
        ReactiveFormsModule,
        RouterLink,
        ConfirmationModalComponent,
    ],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {

    private products = signal<Product[]>([]);

    public search = signal<string>('');

    public filteredProducts = computed(() => {
        const products = this.products();
        const search = this.search().trim();
        return products.filter((product) =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.date_release.toLowerCase().includes(search) ||
            product.date_revision.toLowerCase().includes(search)
        );
    });

    public searchInput = new FormControl<string>('', { nonNullable: true });
    
    public productToDelete = signal<Product | null>(null);
    
    constructor(
        private productsApiService: ProductsApiService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
       this.getProducts();
    }

    private getProducts() {
        this.productsApiService.getProducts().subscribe({
            next: (resp) => {
                this.products.set(resp.data);
                if (!resp.data.length) {
                    this.alertService.warning('No se encontraron productos');
                }
            },
            error: () => {
                this.alertService.error('Ocurrió un error al cargar los productos');
            }
        });
    }

    public deleteProduct() {
        const product = this.productToDelete();
        if (!product) return;

        this.productsApiService.deleteProduct(product.id).subscribe({
            next: () => {
                this.getProducts();
                this.productToDelete.set(null);
                this.alertService.success('Producto eliminado correctamente');
            },
            error: () => {
                this.alertService.error('Ocurrió un error al eliminar el producto');
            }
        });
    }

    public getDeleteMessage() {
        const product = this.productToDelete();
        return product ? `¿Estás seguro de eliminar el producto "${product.name}"?` : '';
    }
}
