import { Component, Input, output } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    standalone: true,
    imports: [],
    templateUrl: './confirmation-modal.component.html',
    styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

    @Input()
    public message:string = '';

    public onCancel = output<void>();

    public onConfirm = output<void>();
    
}
