
export class DateUtils {

    public static parseDateOrNull(date:string) {
        if (!this.isValidDate(date)) return null;
        const dateStr = date.includes('T') ? date : date + 'T00:00:00';
        return new Date(dateStr);
    }

    public static isValidDate(date:string) {
        return !!date && !isNaN(Date.parse(date));
    }

    public static addYears(date:Date, years:number) {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + years);
        return newDate;
    }

    public static getDateString(date:Date){
        return date.toISOString().split('T')[0];
    }

    public static isTodayOrFuture(date:Date) {
        return date.getTime() >= this.getToday().getTime();
    }

    public static getToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
}