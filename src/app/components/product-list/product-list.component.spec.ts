import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { signal } from '@angular/core';
import { Product } from '../../services/products-api.models';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductListComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.products = signal<Product[]>([]);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
