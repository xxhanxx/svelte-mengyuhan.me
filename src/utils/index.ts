const utils = {
    // iso date to date
    isoDateToDate(isoDate: string): Date {
        return new Date(isoDate);
    },
    // format date to yy/mm/dd
    formatDate(date: Date): string {
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }
}
export default utils;