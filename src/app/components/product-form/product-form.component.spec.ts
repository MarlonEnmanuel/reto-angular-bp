import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ProductsApiService } from '../../services/products-api.service';
import { ProductsApiMocker } from '../../services/products-api.mocks';

describe('ProductFormComponent', () => {
    let component: ProductFormComponent;
    let fixture: ComponentFixture<ProductFormComponent>;
    let apiMocker: ProductsApiMocker;
    let location: Location;

    beforeEach(async () => {
        apiMocker = new ProductsApiMocker();
        const locationSpy = jasmine.createSpyObj('Location', ['back']);

        await TestBed.configureTestingModule({
            imports: [ProductFormComponent, ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: Location, useValue: locationSpy },
                FormService,
                { provide: ProductsApiService, useValue: apiMocker.spy },
            ]
        })
        .compileComponents();

        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(ProductFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
