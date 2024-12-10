import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductEditPageComponent } from './product-edit-page.component';
import { ProductsApiMocker } from '../../services/products-api.mocks';
import { ProductsApiService } from '../../services/products-api.service';
import { Router } from '@angular/router';

describe('ProductEditPageComponent', () => {
    let component: ProductEditPageComponent;
    let fixture: ComponentFixture<ProductEditPageComponent>;
    let apiMocker: ProductsApiMocker;
    let routerSpy: any;

    beforeEach(async () => {
        apiMocker = new ProductsApiMocker();
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ProductEditPageComponent],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: ProductsApiService, useValue: apiMocker.spy },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductEditPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.productId = '001';
        apiMocker.mockGetProduct();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
