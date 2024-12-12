import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ProductsApiService } from '../products-api/products-api.service';
import { catchError, map, Observable, of } from 'rxjs';
import { DateService } from '../date/date.service';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor(
        private readonly productsApiService: ProductsApiService,
        private readonly dateService: DateService,
    ) { }

    public alphaNumericValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            if (/^[a-zA-Z0-9]*$/.test(control.value)) return null;
            return { alphaNumeric: true };
        };
    }

    public validDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            if (this.dateService.isValidDate(control.value)) return null;
            return { validDate: true };
        };
    };

    public todayOrFutureValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            const date = this.dateService.parseDateOrNull(control.value);
            if (!date) return null;
            if (this.dateService.isTodayOrFuture(date)) return null;
            return { todayOrFuture: true };
        };
    };

    public availableProductValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) return of(null);
            return this.productsApiService.existsProduct(control.value).pipe(
                map(exists => exists ? { availableProduct: true } : null),
                catchError(() => of(null))
            );
        }
    }

    public getErrorMessages(control: AbstractControl) {
        if (!control.errors) {
            return [];
        }
        return Object.entries(control.errors).map(([key, error]) => {
            switch (key) {
                case 'required': return 'Requerido';
                case 'minlength': return `Mínimo ${error.requiredLength} caracteres`;
                case 'maxlength': return `Máximo ${error.requiredLength} caracteres`;
                case 'alphaNumeric': return 'Solo alfanuméricos';
                case 'validDate': return 'Fecha incorrecta';
                case 'todayOrFuture': return 'Debe ser igual o mayor a hoy';
                case 'availableProduct': return 'ID no disponible';
                default: return 'Dato incorrecto';
            };
        });
    }
}
