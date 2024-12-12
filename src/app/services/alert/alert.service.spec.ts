import { TestBed } from '@angular/core/testing';

import { AlertService } from '../alert/alert.service';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlertService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add an error alert', () => {
        service.error('test message');

        const alerts = service.alerts()
        expect(alerts.length).toBe(1);
        expect(alerts[0].type).toBe('error');
        expect(alerts[0].message).toBe('test message');
    });

    it('should add an success alert', () => {
        service.success('test message');

        const alerts = service.alerts()
        expect(alerts.length).toBe(1);
        expect(alerts[0].type).toBe('success');
        expect(alerts[0].message).toBe('test message');
    });
    
    it('should remove an alert', () => {
        service.success('test message');
        service.removeAlert(service.alerts()[0]);

        const alerts = service.alerts()
        expect(alerts.length).toBe(0);
    });
});
