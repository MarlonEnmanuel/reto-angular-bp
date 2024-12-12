import { TestBed } from '@angular/core/testing';
import { ProductsApiService } from './products-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductsDataMocks } from './products-api.mocks';

describe('ProductsApiService', () => {
    let service: ProductsApiService;
    let httpTesting: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(ProductsApiService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get products list', () => {
        const mock = ProductsDataMocks.getProducts;

        service.getProducts().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(Array.isArray(response.data)).toBeTrue();
            expect(response).toEqual(mock.res);
        });

        const req = httpTesting.expectOne('/api/bp/products');
        expect(req.request.method).toEqual('GET');

        req.flush(mock.res);
    });

    it('should get a single product', () => {
        const mock = ProductsDataMocks.getProduct;

        service.getProduct(mock.req).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(mock.res);
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req}`);
        expect(req.request.method).toEqual('GET');

        req.flush(mock.res);
    });

    it('should handle error when getting a product that doesnt exist', () => {
        const mock = ProductsDataMocks.getProductError;

        service.getProduct(mock.req).subscribe({
            next: () => fail('Expected an error, but got a response'),
            error: (resp) => {
                expect(resp).toBeTruthy();
                expect(resp.status).toEqual(400);
                expect(resp.error).toEqual(mock.res);
            }
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req}`);
        expect(req.request.method).toEqual('GET');

        req.flush(mock.res, { status: 400, statusText: 'Bad Request' });
    });

    it('should check if a product exists', () => {
        service.existsProduct('001').subscribe((response) => {
            expect(response).toBeTrue();
        });

        const req = httpTesting.expectOne('/api/bp/products/verification/001');
        expect(req.request.method).toEqual('GET');

        req.flush(true);
    });

    it('should create a product', () => {
        const mock = ProductsDataMocks.createProduct;

        service.createProduct(mock.req).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(mock.res);
        });

        const req = httpTesting.expectOne('/api/bp/products');
        expect(req.request.method).toEqual('POST');

        req.flush(mock.res);
    });

    it('should handle error when create a existing product', () => {
        const mock = ProductsDataMocks.createProductError;

        service.createProduct(mock.req).subscribe({
            next: () => fail('Expected a response, but got an error'),
            error: (resp) => {
                expect(resp).toBeTruthy();
                expect(resp.status).toEqual(400);
                expect(resp.error).toEqual(mock.res);
            },
        });

        const req = httpTesting.expectOne('/api/bp/products');
        expect(req.request.method).toEqual('POST');

        req.flush(mock.res, { status: 400, statusText: 'Bad Request' });
    });

    it('should edit a product', () => {
        const mock = ProductsDataMocks.editProduct;

        service.editProduct(mock.req).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(mock.res);
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req.id}`);
        expect(req.request.method).toEqual('PUT');

        req.flush(mock.res);
    });

    it('should handle error when editting a product that doesnt exist', () => {
        const mock = ProductsDataMocks.editProductError;

        service.editProduct(mock.req).subscribe({
            next: () => fail('Expected a response, but got an error'),
            error: (resp) => {
                expect(resp).toBeTruthy();
                expect(resp.status).toEqual(400);
                expect(resp.error).toEqual(mock.res);
            },
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req.id}`);
        expect(req.request.method).toEqual('PUT');

        req.flush(mock.res, { status: 400, statusText: 'Bad Request' });
    });

    it('should delete a product', () => {
        const mock = ProductsDataMocks.deleteProduct;

        service.deleteProduct(mock.req).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(mock.res as any);
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush(mock.res);
    });

    it('should handle error when deleting a product that doesnt exist', () => {
        const mock = ProductsDataMocks.deleteProductError;

        service.deleteProduct(mock.req).subscribe({
            next: () => fail('Expected a response, but got an error'),
            error: (resp) => {
                expect(resp).toBeTruthy();
                expect(resp.status).toEqual(400);
                expect(resp.error).toEqual(mock.res);
            },
        });

        const req = httpTesting.expectOne(`/api/bp/products/${mock.req}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush(mock.res, { status: 400, statusText: 'Bad Request' });
    });

});
