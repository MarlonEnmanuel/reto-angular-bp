import { Component, computed, signal } from '@angular/core';
import { ProductsApiService } from '../../services/products-api/products-api.service';
import { Product } from '../../services/products-api/products-api.models';
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { AlertService } from '../../services/alert/alert.service';
import { TableSkeletonComponent } from "../../components/table-skeleton/table-skeleton.component";

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [
    ProductListComponent,
    ReactiveFormsModule,
    RouterLink,
    ConfirmationModalComponent,
    TableSkeletonComponent
],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss'
})
export default class ProductsPageComponent {

    private products = signal<Product[]>([]);

    public search = signal<string>('');

    public filteredProducts = computed(() => {
        const products = this.products();
        const search = this.search().trim().toLowerCase();
        if (!search) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.date_release.toLowerCase().includes(search) ||
            product.date_revision.toLowerCase().includes(search)
        );
    });

    public loading = signal<boolean>(false);
    
    public productToDelete = signal<Product | null>(null);
    
    constructor(
        private readonly productsApiService: ProductsApiService,
        private readonly alertService: AlertService
    ) {}

    ngOnInit() {
       this.getProducts();
    }

    private getProducts() {
        this.loading.set(true);
        this.productsApiService.getProducts().subscribe({
            next: (resp) => {
                this.products.set(resp.data);
                this.loading.set(false);
            },
            error: () => {
                this.alertService.error('Ocurrió un error al cargar los productos');
                this.loading.set(false);
            }
        });
    }

    public updateSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        this.search.set(target.value);
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
