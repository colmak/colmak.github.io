import { isLeap, getCenturyAnchor, getDoomsday, getMonthDoomsday, getDayOfWeek } from "./doomsdayUtils";

export const learnSteps = [
  {
    question: (date: Date) => `Memorize: Is ${date.getFullYear()} a leap year? (Yes/No)`,
    getCorrect: (date: Date) => (isLeap(date.getFullYear()) ? "yes" : "no"),
    hint: (date: Date) =>
      "Remember: A year is a leap year if it’s divisible by 4, except when it ends in 00—then it must be divisible by 400.",
    strategy:
      "Memorize the simple rule: Every 4th year is a leap year, unless it's a century not divisible by 400.",
    example: (date: Date) => {
      const year = date.getFullYear();
      return `For ${year}:
Basic Rule: If (year % 4 == 0) → leap year.
Edge Case: If (year % 100 == 0) → not leap, unless (year % 400 == 0).

Example:
• For 2000: 2000 % 4 = 0, 2000 % 100 = 0, 2000 % 400 = 0 → leap year.
• For 1900: 1900 % 4 = 0, 1900 % 100 = 0, 1900 % 400 = 300 → not a leap year.`;
    },
  },
  {
    question: (date: Date) =>
      `Memorize: What is the century's anchor day for ${date.getFullYear()}? (e.g., Sunday)`,
    getCorrect: (date: Date) => {
      const anchorNum = getCenturyAnchor(date.getFullYear());
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[anchorNum];
    },
    hint: (date: Date) =>
      "Memorize these common anchors: 1800s = Friday, 1900s = Wednesday, 2000s = Tuesday.",
    strategy:
      "You don’t need to recalculate every time—simply memorize the century anchors for common centuries.",
    example: (date: Date) => {
      // Use 1900 as an example.
      const exampleYear = date.getFullYear() === 1900 ? date.getFullYear() : 1900;
      const century = Math.floor(exampleYear / 100);
      const mod = century % 4;
      const calc = (5 * mod + 2) % 7;
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `For ${exampleYear}:
Memorizable Fact: The anchor for the 1900s is Wednesday.
Calculation:
1. Century = ${Math.floor(exampleYear / 100)}.
2. ${Math.floor(exampleYear / 100)} mod 4 = ${mod}.
3. (5 * ${mod} + 2) = ${5 * mod + 2}.
4. (${5 * mod + 2}) mod 7 = ${calc} → ${days[calc]}.`;
    },
  },
  {
    question: (date: Date) =>
      `Memorize: What is the doomsday for ${date.getFullYear()}? (e.g., Sunday)`,
    getCorrect: (date: Date) => {
      const doomsdayNum = getDoomsday(date.getFullYear());
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[doomsdayNum];
    },
    hint: (date: Date) =>
      "Remember: Split the last two digits of the year into three parts: divide by 12, take the remainder, and divide that remainder by 4. Then add these parts to the century anchor.",
    strategy: "Practice with one or two years until you memorize the pattern.",
    example: (date: Date) => {
      const year = date.getFullYear();
      const lastTwo = year % 100;
      const a = Math.floor(lastTwo / 12);
      const b = lastTwo % 12;
      const c = Math.floor(b / 4);
      const sum = a + b + c;
      const centuryAnchor = getCenturyAnchor(year);
      const doomsdayNum = (centuryAnchor + sum) % 7;
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `For ${year}:
Memorizable Fact: Once you know the century anchor, remember doomsday = anchor + (a + b + c) mod 7.
Where:
• Last two digits = ${lastTwo}
• a = floor(${lastTwo}/12) = ${a}
• b = ${lastTwo} mod 12 = ${b}
• c = floor(${b}/4) = ${c}
Sum = ${a} + ${b} + ${c} = ${sum}.
Then, doomsday = (${centuryAnchor} + ${sum}) mod 7 = ${doomsdayNum} (${days[doomsdayNum]}).`;
    },
  },
  {
    question: (date: Date) =>
      `Memorize: What is the fixed doomsday for month ${date.getMonth() + 1}? (enter the day number)`,
    getCorrect: (date: Date) => {
      const leap = isLeap(date.getFullYear());
      return getMonthDoomsday(date.getMonth() + 1, leap).toString();
    },
    hint: (date: Date) =>
      "Memorize these fixed dates: For January, remember 3 (or 4 in leap years); February is 28 (or 29 in leap years); March is 14; April is 4; May is 9; June is 6; July is 11; August is 8; September is 5; October is 10; November is 7; December is 12.",
    strategy:
      "Focus on memorizing the simple, fixed doomsday numbers for each month. For January and February, remember to adjust for leap years.",
    example: (date: Date) => {
      const month = date.getMonth() + 1;
      const leap = isLeap(date.getFullYear());
      const doomsday = getMonthDoomsday(month, leap);
      return `For month ${month} in a ${leap ? "leap" : "non-leap"} year:
Memorizable Fact: The fixed doomsday for this month is ${doomsday}.
For example, in a non-leap year, January is 3 and February is 28; in a leap year, January is 4 and February is 29.`;
    },
  },
  {
    question: (date: Date) =>
      `Memorize: What day of the week does ${date.toLocaleDateString()} fall on? (e.g., Sunday)`,
    getCorrect: (date: Date) =>
      getDayOfWeek(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    hint: (date: Date) =>
      "Find the difference between the given date and the fixed doomsday for that month, then add that to the year's doomsday. Adjust for negatives by adding 7.",
    strategy:
      "Memorize the fixed doomsday for the month and the year's doomsday. Then simply add (or subtract) the day difference.",
    example: (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const monthDoomsday = getMonthDoomsday(month, isLeap(year));
      const doomsday = getDoomsday(year);
      const diff = day - monthDoomsday;
      let dayIndex = (doomsday + diff) % 7;
      if (dayIndex < 0) dayIndex += 7;
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `For ${date.toLocaleDateString()}:
Memorizable Fact: Final day = (year's doomsday + (date - month's doomsday)) mod 7.
Where:
• Month's fixed doomsday for month ${month} = ${monthDoomsday}.
• Year's doomsday = ${days[doomsday]}.
• Difference = ${day} - ${monthDoomsday} = ${diff}.
Thus, final day = (${days[doomsday]} + ${diff}) mod 7 = ${days[dayIndex]}.`;
    },
  },
];
