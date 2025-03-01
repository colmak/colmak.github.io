export function isLeap(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  export function getCenturyAnchor(year: number): number {
    const century = Math.floor(year / 100);
    return (5 * (century % 4) + 2) % 7;
  }
  
  export function getDoomsday(year: number): number {
    const y = year % 100;
    const a = Math.floor(y / 12);
    const b = y % 12;
    const c = Math.floor(b / 4);
    const sum = a + b + c;
    const centuryAnchor = getCenturyAnchor(year);
    return (centuryAnchor + sum) % 7;
  }
  
  export function getMonthDoomsday(month: number, leap: boolean): number {
    const doomsdays: Record<number, number> = {
      1: leap ? 4 : 3,
      2: leap ? 29 : 28,
      3: 14,
      4: 4,
      5: 9,
      6: 6,
      7: 11,
      8: 8,
      9: 5,
      10: 10,
      11: 7,
      12: 12,
    };
    return doomsdays[month] ?? 0;
  }
  
  export function getDayOfWeek(year: number, month: number, day: number): string {
    const leap = isLeap(year);
    const doomsday = getDoomsday(year);
    const monthDoomsday = getMonthDoomsday(month, leap);
    const diff = day - monthDoomsday;
    let dayIndex = (doomsday + diff) % 7;
    if (dayIndex < 0) dayIndex += 7;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex] ?? "Invalid day";
  }
  
  export function generateRandomDate(rangeOption: string): Date {
    let startYear: number, endYear: number;
    if (rangeOption === "modern") {
      startYear = 1900;
      endYear = 2099;
    } else if (rangeOption === "extended") {
      startYear = 1800;
      endYear = 2199;
    } else {
      startYear = 1900;
      endYear = 2099;
    }
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const day = Math.floor(Math.random() * lastDay) + 1;
    return new Date(year, month, day);
  }
  