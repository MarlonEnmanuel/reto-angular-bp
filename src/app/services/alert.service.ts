import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    public alerts = signal<Alert[]>([]);

    constructor() { }

    public error(message:string) {
        const newAlert:Alert = { type: 'error', message };
        this.alerts.update(alerts => [...alerts, newAlert]);
    }

    public success(message:string) {
        const newAlert:Alert = { type: 'success', message };
        this.alerts.update(alerts => [...alerts, newAlert]);
        setTimeout(() => this.removeAlert(newAlert), 5000);
    }

    public removeAlert(alert:Alert) {
        this.alerts.update(alerts => alerts.filter(a => a !== alert));
    }
}

export type AlertType = 'success'|'error';

export interface Alert {
    type : AlertType;
    message : string;
}