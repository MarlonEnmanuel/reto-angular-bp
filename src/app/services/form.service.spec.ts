import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import { ProductsApiService } from './products-api.service';
import { ProductsApiMocker } from './products-api.mocks';

describe('FormService', () => {
    let service: FormService;
    let apiMocker: ProductsApiMocker;

    beforeEach(() => {
        apiMocker = new ProductsApiMocker();
        TestBed.configureTestingModule({
            providers: [
                { provide: ProductsApiService, useValue: apiMocker.spy },
            ]
        });
        service = TestBed.inject(FormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
