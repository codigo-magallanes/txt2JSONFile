/**
 * Help with dates
 */

const sunPhases = ["equiNorth", "solsNorth", "equiSouth", "solsSouth"];

const monthNamesEN = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const monthNamesES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const monthNames = new Map([
  ["EN", monthNamesEN],
  ["ES", monthNamesES],
]);

// better with an object than a map()
// or call only the array
const moonPhasesEN = [
  "new moon",
  "crescent quarter",
  "full moon",
  "last quarter",
];
const moonPhasesES = [
  "luna nueva",
  "cuarto creciente",
  "luna llena",
  "cuarto menguante",
];
const moonSpecialES = [
    "super luna"
]
const moonSpecialEN = [
    "super moon"
]
const moonTerms = {
  EN: {
      phases: moonPhasesEN,
      special: moonSpecialEN
  },
  ES: {
      phases: moonPhasesES,
      special: moonSpecialES
  }
};

function monthNameToEng(lang, dateTime) {
    let monthNamesArr = monthNames.get(lang);
    let eng = monthNames.get("EN");
    monthNamesArr.forEach((m, i) => {
      if (dateTime.includes(m.toLowerCase())) {
        dateTime = dateTime.replace(m, eng[i]);
      }
    });
    return dateTime;
  }
    
function saveDate({ year, date, UTCTimeZone, format, lang }) {
    let dateTime = lang ? monthNameToEng(lang, date) : date;
    let setDate = formDate({ year, dateTime, UTCTimeZone });
    return saveThisDate(setDate, format);
  }
  
  function formDate({ year, dateTime, UTCTimeZone }) {
    let arr = [dateTime];
    if (year) arr.unshift(year);
    if (UTCTimeZone) arr.push("Z");
    return arr.join(" ");
  }

  function setTimeToZero(d) {
    return new Date(d).setUTCHours(0, 0, 0)
  }

  function getNumDays(x) {
    return (x / (24*60*60*1000))
  }

  function setDayOfYear(d, n) {
    let diff = (setTimeToZero(d) - setTimeToZero(n))
    return getNumDays(diff)
  }

  function saveThisDate(thisDate, format) {
    let date
    let d = new Date(thisDate);
    switch (format ? format : config.saveDatesAs) {
      case "ms":
        date = Date.parse(d);
        break;
      case "json":
        date = d.toJSON();
        break;
      case "ISO":
        date = d.toISOString();
        break;
      case "locale":
        date = d;
        break;
      default:
        date = d.toLocaleDateString();
    }
    return date;
  }
  
module.exports = { sunPhases, monthNames, moonTerms, saveDate, setTimeToZero, setDayOfYear };
