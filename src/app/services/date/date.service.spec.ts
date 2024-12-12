import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
    let service: DateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DateService);
    });

    it('should parse to date', () => {
        const date = service.parseDateOrNull('2021-01-01');
        expect(date).toEqual(new Date('2021-01-01 00:00:00'));
    });

    it('should parse to null', () => {
        const date = service.parseDateOrNull('');
        expect(date).toBeNull();
    });

    it('should validate date', () => {
        const valid = service.isValidDate('2021-01-01');
        expect(valid).toBeTrue();
    });

    it('should invalidate date', () => {
        const valid = service.isValidDate('');
        expect(valid).toBeFalse();
    });

    it('should add years', () => {
        const date = service.addYears(new Date('2021-01-01'), 1);
        expect(date).toEqual(new Date('2022-01-01'));
    });

    it('should get date string', () => {
        const date = service.getDateString(new Date('2021-01-01 00:00:00'));
        expect(date).toEqual('2021-01-01');
    });

    it('should be today or future', () => {
        const today = service.getToday();
        const isToday = service.isTodayOrFuture(today);
        expect(isToday).toBeTrue();
    });

    it('should not be today or future', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isToday = service.isTodayOrFuture(yesterday);
        expect(isToday).toBeFalse();
    });

    it('should get today', () => {
        const today = service.getToday();
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        expect(today).toEqual(now);
    });
});
