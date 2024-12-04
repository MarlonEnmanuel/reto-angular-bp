import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Product } from './products-api.models';

@Injectable({
    providedIn: 'root'
})
export class ProductsApiService {

    private baseUrl = '/api/bp/products';

    constructor(
        private http:HttpClient,
    ) { }

    public getProducts() {
        return this.http.get<ApiResponse<Product[]>>(this.baseUrl);
    }

    public getProduct(id:string) {
        const url = `${this.baseUrl}/${id}`;	
        return this.http.get<Product>(url);
    }

    public existsProduct(id:string) {
        const url = `${this.baseUrl}/verification/${id}`;	
        return this.http.get<boolean>(url);
    }

    public createProduct(product:Product) {
        return this.http.post<ApiResponse<Product>>(this.baseUrl, product);
    }

    public editProduct(product:Product) {
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put<ApiResponse<Product>>(url , product);
    }

    public deleteProduct(id:string) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<ApiResponse>(url);
    }
}
