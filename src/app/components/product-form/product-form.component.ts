import { Component, Input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/form/form.service';
import { Product } from '../../services/products-api/products-api.models';
import { Location } from '@angular/common';
import { AlertService } from '../../services/alert/alert.service';
import { DateService } from '../../services/date/date.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

    @Input()
    public product?: Product;
    public sendProduct = output<Product>();

    public form!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly formService: FormService,
        public readonly location: Location,
        private readonly alertService: AlertService,
        private readonly dateService: DateService,
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.nonNullable.group({
            id: [
                { value: this.product?.id ?? '', disabled: !!this.product },
                [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.formService.alphaNumericValidator()],
                [this.formService.availableProductValidator()],
            ],
            name: [
                this.product?.name ?? '',
                [Validators.required, Validators.minLength(6), Validators.maxLength(100)]
            ],
            description: [
                this.product?.description ?? '',
                [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
            ],
            logo: [
                this.product?.logo ?? '',
                [Validators.required]
            ],
            dateRelease: [
                this.product?.date_release ?? '',
                [Validators.required, this.formService.validDateValidator(), this.formService.todayOrFutureValidator()]
            ],
            dateRevision: [
                { value: this.product?.date_revision ?? '', disabled: true }
            ],
        }, { updateOn: 'blur' });
        
        this.suscribeTrimValue(this.id);
        this.suscribeTrimValue(this.name);
        this.suscribeTrimValue(this.description);
        this.suscribeTrimValue(this.logo);
        this.suscribeDateReleaseChanges();
    }

    get id() { return this.form?.get('id') as FormControl }
    get name() { return this.form?.get('name') as FormControl; }
    get description() { return this.form?.get('description') as FormControl; }
    get logo() { return this.form?.get('logo') as FormControl; }
    get dateRelease() { return this.form?.get('dateRelease') as FormControl; }
    get dateRevision() { return this.form?.get('dateRevision') as FormControl; }

    public isInvalid(control: FormControl) {
        return control.invalid && control.touched;
    }

    public getErrors(control: FormControl) {
        return this.isInvalid(control) ?
                this.formService.getErrorMessages(control).join(', ') : '';
    }

    public getMinReleaseDate(){
        const today = this.dateService.getToday();
        return this.dateService.getDateString(today);
    }

    public handleSubmit() {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            this.alertService.error('Algunos campos son incorrectos');
            return;
        }

        if (this.form.pristine) {
            this.alertService.error('El formulario no ha sido modificado');
            return;
        }

        this.sendProduct.emit(this.getCurrentProduct());
    }

    public getCurrentProduct(): Product{
        return {
            id: this.id.value.trim(),
            name: this.name.value.trim(),
            description: this.description.value.trim(),
            logo: this.logo.value.trim(),
            date_release: this.dateRelease.value,
            date_revision: this.dateRevision.value
        };
    }

    private suscribeDateReleaseChanges() {
        this.dateRelease.valueChanges.subscribe(value => {
            const date = this.dateService.parseDateOrNull(value);
            if (date) {
                const newDate = this.dateService.addYears(date, 1);
                this.dateRevision.setValue(this.dateService.getDateString(newDate));
            } else {
                this.dateRevision.setValue('');
            }
        });
    }

    private suscribeTrimValue(control: FormControl){
        control.valueChanges.subscribe(value => {
            control.patchValue(value.trim(), { emitEvent: false });
        });
    }
}
