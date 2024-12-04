import { Component, computed, Input, output, Signal, signal } from '@angular/core';
import { Product } from '../../services/products-api.models';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

    @Input({ required: true })
    public products!:Signal<Product[]>;

    public onDelete = output<Product>();

    public productsPerPage = signal<number>(5);

    public currentPage = signal<number>(1);

    public totalPages = computed(() => {
        return Math.ceil(this.products().length / this.productsPerPage());
    });

    public pagedProducts = computed(() => {
        const start = (this.currentPage() - 1) * this.productsPerPage();
        return this.products().slice(start, start + this.productsPerPage());
    });

    constructor(
        public router: Router,
    ) {}

    public handleProductsPerPageChange = (event: Event) => {
        const input = event.target as HTMLSelectElement;
        this.productsPerPage.set(Number(input.value));
        this.currentPage.set(1);
    }

    public previousPage(){
        this.currentPage.update((prev) => {
            return prev <= 1 ? 1 : prev - 1;
        });
    }

    public nextPage(){
        this.currentPage.update((prev) => {
            return prev >= this.totalPages() ? this.totalPages() : prev + 1;
        });
    }
}
