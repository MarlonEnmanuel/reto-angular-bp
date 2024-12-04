import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPageComponent } from './products-page.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';
import { ProductsApiMocker } from '../../services/products-api.mocks';
import { ProductsApiService } from '../../services/products-api.service';

describe('ProductsPageComponent', () => {
    let component: ProductsPageComponent;
    let fixture: ComponentFixture<ProductsPageComponent>;
    let apiMocker: ProductsApiMocker;

    beforeEach(async () => {
        apiMocker = new ProductsApiMocker();

        await TestBed.configureTestingModule({
            imports: [
                ProductsPageComponent,
                ProductListComponent,
                ReactiveFormsModule,
                ConfirmationModalComponent,
            ],
            providers: [
                provideRouter([]),
                { provide: ProductsApiService, useValue: apiMocker.spy },
            ]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ProductsPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        apiMocker.mockGetProducts([]);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should show product list', () => {
        apiMocker.mockGetProducts([
            { id: '001', name: 'Product 1', description: 'Description 1', logo: 'img', date_release: '2021-01-01', date_revision: '2021-01-01' },
        ]);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.product-list')).toBeTruthy();
        expect(compiled.querySelector('.product-list table')).toBeTruthy();
    })
});
