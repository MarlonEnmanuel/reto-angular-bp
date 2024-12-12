import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    public parseDateOrNull(date:string) {
        if (!this.isValidDate(date)) return null;
        const dateStr = date.includes('T') ? date : date + 'T00:00:00';
        return new Date(dateStr);
    }

    public isValidDate(date:string) {
        return !!date && !isNaN(Date.parse(date));
    }

    public addYears(date:Date, years:number) {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + years);
        return newDate;
    }

    public getDateString(date:Date){
        return date.toISOString().split('T')[0];
    }

    public isTodayOrFuture(date:Date) {
        return date.getTime() >= this.getToday().getTime();
    }

    public getToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
}
