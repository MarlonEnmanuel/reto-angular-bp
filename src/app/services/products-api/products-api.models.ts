
export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export interface ApiResponse<T = void> {
    message?:string;
    data:T;
}

export interface ApiError {
    name:string;
    message:string;
    stack:string;
}

export type ApiStatus = 'initial'|'loading'|'success'|'error';