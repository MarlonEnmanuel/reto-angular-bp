import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-alert-container',
    standalone: true,
    imports: [],
    templateUrl: './alert-container.component.html',
    styleUrl: './alert-container.component.scss'
})
export class AlertContainerComponent {

    constructor(
        public alertService: AlertService
    ) { }
}
