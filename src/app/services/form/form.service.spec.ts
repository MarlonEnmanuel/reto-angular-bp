import { TestBed } from '@angular/core/testing';
import { FormService } from '../form/form.service';
import { ProductsApiService } from '../products-api/products-api.service';
import { ProductsApiMocker } from '../products-api/products-api.mocks';
import { FormControl } from '@angular/forms';
import { DateService } from '../date/date.service';

describe('FormService', () => {
    let service: FormService;
    let apiMocker: ProductsApiMocker;
    const dateService: DateService = new DateService();

    beforeEach(() => {
        apiMocker = new ProductsApiMocker();
        TestBed.configureTestingModule({
            providers: [
                { provide: ProductsApiService, useValue: apiMocker.spy },
                { provide: DateService, useValue: dateService },
            ]
        });
        service = TestBed.inject(FormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('alphaNumericValidator should return null', () => {
        const control = new FormControl('abc123');
        const validator = service.alphaNumericValidator();
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('alphaNumericValidator should return error', () => {
        const control = new FormControl('abc123!');
        const validator = service.alphaNumericValidator();
        const result = validator(control);
        expect(result).toEqual({ alphaNumeric: true });
    });

    it('validDateValidator should return null', () => {
        const control = new FormControl('2021-01-01');
        const validator = service.validDateValidator();
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('validDateValidator should return error', () => {
        const control = new FormControl('2021-01-32');
        const validator = service.validDateValidator();
        const result = validator(control);
        expect(result).toEqual({ validDate: true });
    });

    it('todayOrFutureValidator should return null', () => {
        spyOn(dateService, 'getToday').and.returnValue(new Date('2021-01-01'));
        const control = new FormControl('2021-01-01');
        const validator = service.todayOrFutureValidator();
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('todayOrFutureValidator should return error', () => {
        spyOn(dateService, 'getToday').and.returnValue(new Date('2021-01-01'));
        const control = new FormControl('2020-01-01');
        const validator = service.todayOrFutureValidator();
        const result = validator(control);
        expect(result).toEqual({ todayOrFuture: true });
    });

    it('availableProductValidator should return null', (done) => {
        apiMocker.mockExistsProduct(false);
        const control = new FormControl('code001');
        const validator = service.availableProductValidator();
        validator(control).subscribe(result => {
            expect(result).toBeNull();
            done();
        });
    });

    it('availableProductValidator should return error', (done) => {
        apiMocker.mockExistsProduct(true);
        const control = new FormControl('code001');
        const validator = service.availableProductValidator();
        validator(control).subscribe(result => {
            expect(result).toEqual({ availableProduct: true });
            done();
        });
    });

    it('getErrorMessages should return empty array', () => {
        const control = new FormControl();
        const result = service.getErrorMessages(control);
        expect(result).toEqual([]);
    });
});
