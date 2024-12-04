import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    public alerts = signal<Alert[]>([]);
    private timeout = 10000;

    constructor() { }

    public error(message:string) {
        this.alert('error', message);
    }

    public success(message:string) {
        this.alert('success', message);
    }

    public warning(message:string) {
        this.alert('warning', message);
    }

    public alert(type:AlertType, message:string) {
        const alert:Alert = { type, message };
        this.alerts.update(alerts => [...alerts, alert]);
        setTimeout(() => this.removeAlert(alert), this.timeout);
    }

    public removeAlert(alert:Alert) {
        this.alerts.update(alerts => alerts.filter(a => a !== alert));
    }
}

export type AlertType = 'success'|'error'|'warning';

export interface Alert {
    type : AlertType;
    message : string;
}