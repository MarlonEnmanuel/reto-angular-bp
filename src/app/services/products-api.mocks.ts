import { of, throwError } from "rxjs";
import { Product } from "./products-api.models";

export const ProductsDataMocks = {

    getProducts: {
        res: {
            "data": [
                {
                    "id": "001",
                    "name": "Producto Nuevo",
                    "description": "Descripción del producto nuevo",
                    "logo": "assets-001.png",
                    "date_release": "2024-10-18",
                    "date_revision": "2024-10-19"
                }
            ]
        }
    },

    getProduct: {
        req: "001",
        res: {
            "id": "001",
            "name": "Producto Nuevo",
            "description": "Descripción del producto nuevo",
            "logo": "assets-001.png",
            "date_release": "2024-10-18",
            "date_revision": "2024-10-19"
        }
    },

    getProductError: {
        req: "002",
        res: {
            "name": "NotFoundError",
            "message": "Not product found with that identifier",
            "stack": "Error: \n    at new HttpError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\HttpError.ts:16:18)\n    at new NotFoundError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\NotFoundError.ts:10:5)\n    at ProductController.getOne (D:\\Devsu\\RetoAngular\\repo-interview-main\\src\\controllers\\ProductControllers.ts:39:13)\n    at ActionMetadata.callMethod (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\metadata\\ActionMetadata.ts:252:44)\n    at D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\RoutingControllers.ts:123:28\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    },

    createProduct: {
        req: {
            "id": "001",
            "name": "Producto Nuevo",
            "description": "Descripción del producto nuevo",
            "logo": "assets-001.png",
            "date_release": "2024-10-18",
            "date_revision": "2024-10-19"
        },
        res: {
            "message": "Product added successfully",
            "data": {
                "id": "001",
                "name": "Producto Nuevo",
                "description": "Descripción del producto nuevo",
                "logo": "assets-001.png",
                "date_release": "2024-10-18",
                "date_revision": "2024-10-19"
            }
        }
    },

    createProductError: {
        req: {
            "id": "001",
            "name": "Producto Nuevo",
            "description": "Descripción del producto nuevo",
            "logo": "assets-001.png",
            "date_release": "2024-10-18",
            "date_revision": "2024-10-19"
        },
        res: {
            "name": "BadRequestError",
            "message": "Duplicate identifier found in the database",
            "stack": "Error: \n    at new HttpError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\HttpError.ts:16:18)\n    at new BadRequestError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\BadRequestError.ts:10:5)\n    at ProductController.createItem (D:\\Devsu\\RetoAngular\\repo-interview-main\\src\\controllers\\ProductControllers.ts:50:13)\n    at ActionMetadata.callMethod (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\metadata\\ActionMetadata.ts:252:44)\n    at D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\RoutingControllers.ts:123:28\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    },

    editProduct: {
        req: {
            "id": "001",
            "name": "Producto Nuevo Editado",
            "description": "Descripción del producto nuevo editado",
            "logo": "assets-001-edit.png",
            "date_release": "2024-10-18",
            "date_revision": "2024-10-19"
        },
        res: {
            "message": "Product updated successfully",
            "data": {
                "id": "001",
                "name": "Producto Nuevo Editado",
                "description": "Descripción del producto nuevo editado",
                "logo": "assets-001-edit.png",
                "date_release": "2024-10-18",
                "date_revision": "2024-10-19"
            }
        }
    },

    editProductError: {
        req: {
            "id": "999",
            "name": "Producto que no existe",
            "description": "Descripción del producto que no existe",
            "logo": "assets-001-edit.png",
            "date_release": "2024-10-18",
            "date_revision": "2024-10-19"
        },
        res: {
            "name": "NotFoundError",
            "message": "Not product found with that identifier",
            "stack": "Error: \n    at new HttpError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\HttpError.ts:16:18)\n    at new NotFoundError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\NotFoundError.ts:10:5)\n    at ProductController.put (D:\\Devsu\\RetoAngular\\repo-interview-main\\src\\controllers\\ProductControllers.ts:65:13)\n    at ActionMetadata.callMethod (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\metadata\\ActionMetadata.ts:252:44)\n    at D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\RoutingControllers.ts:123:28\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    },

    deleteProduct: {
        req: "001",
        res: {
            "message": "Product removed successfully"
        }
    },

    deleteProductError: {
        req: "999",
        res: {
            "name": "NotFoundError",
            "message": "Not product found with that identifier",
            "stack": "Error: \n    at new HttpError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\HttpError.ts:16:18)\n    at new NotFoundError (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\http-error\\NotFoundError.ts:10:5)\n    at ProductController.remove (D:\\Devsu\\RetoAngular\\repo-interview-main\\src\\controllers\\ProductControllers.ts:83:13)\n    at ActionMetadata.callMethod (D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\metadata\\ActionMetadata.ts:252:44)\n    at D:\\Devsu\\RetoAngular\\repo-interview-main\\node_modules\\src\\RoutingControllers.ts:123:28\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    },

};

export class ProductsApiMocker {

    public spy = jasmine.createSpyObj('ProductsApiService', [
        'getProducts',
        'getProduct',
        'existsProduct',
        'createProduct',
        'editProduct',
        'deleteProduct',
    ]);

    mockGetProducts(data:Product[] = ProductsDataMocks.getProducts.res.data) {
        this.spy.getProducts.and.returnValue(of({ data }));
    }

    mockGetProductsError() {
        this.spy.getProducts.and.returnValue(throwError(() => ProductsDataMocks.getProductError.res));
    }

    mockGetProduct(data:Product = ProductsDataMocks.getProduct.res) {
        this.spy.getProduct.and.returnValue(of(data));
    }

    mockGetProductError() {
        this.spy.getProduct.and.returnValue(throwError(() => ProductsDataMocks.getProductError.res));
    }

    mockExistsProduct(data:boolean = false) {
        this.spy.existsProduct.and.returnValue(of(data));
    }

    mockCreateProduct(data:Product = ProductsDataMocks.createProduct.res.data) {
        this.spy.createProduct.and.returnValue(of({ data }));
    }

    mockCreateProductError() {
        this.spy.createProduct.and.returnValue(throwError(() => ProductsDataMocks.createProductError.res));
    }

    mockEditProduct(data:Product = ProductsDataMocks.editProduct.res.data) {
        this.spy.editProduct.and.returnValue(of({ data }));
    }

    mockEditProductError() {
        this.spy.editProduct.and.returnValue(throwError(() => ProductsDataMocks.editProductError.res));
    }

    mockDeleteProduct(data:any = ProductsDataMocks.deleteProduct.res) {
        this.spy.deleteProduct.and.returnValue(of(data));
    }

    mockDeleteProductError() {
        this.spy.deleteProduct.and.returnValue(throwError(() => ProductsDataMocks.deleteProductError.res));
    }
}