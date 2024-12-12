import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProductCreatePageComponent from './product-create-page.component';
import { ProductsApiMocker } from '../../services/products-api/products-api.mocks';
import { ProductsApiService } from '../../services/products-api/products-api.service';
import { Router } from '@angular/router';

describe('ProductCreateComponent', () => {
    let component: ProductCreatePageComponent;
    let fixture: ComponentFixture<ProductCreatePageComponent>;
    let apiMocker: ProductsApiMocker;
    let routerSpy: any;

    beforeEach(async () => {
        apiMocker = new ProductsApiMocker();
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ProductCreatePageComponent],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: ProductsApiService, useValue: apiMocker.spy },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductCreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
